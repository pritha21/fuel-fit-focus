
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export interface DailyStats {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  caloriesGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  waterConsumed: number;
  waterGoal: number;
}

export interface WeeklyData {
  day: string;
  calories: number;
}

export const useDietTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [meals, setMeals] = useState({
    breakfast: [] as Food[],
    lunch: [] as Food[],
    dinner: [] as Food[],
    snacks: [] as Food[]
  });

  const [foodSearchResults, setFoodSearchResults] = useState<Food[]>([]);
  const [allFoodItems, setAllFoodItems] = useState<Food[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [waterIntake, setWaterIntake] = useState(0);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user profile:', error);
      return;
    }

    setUserProfile(data);
  };

  // Fetch today's water intake
  const fetchWaterIntake = async () => {
    if (!user) return;

    const today = getTodayDate();
    const { data, error } = await supabase
      .from('daily_water_intake')
      .select('water_consumed_ml')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching water intake:', error);
      return;
    }

    setWaterIntake(data?.water_consumed_ml || 0);
  };

  // Update water intake with proper upsert handling
  const updateWaterIntake = async (amount: number) => {
    if (!user) return;

    const today = getTodayDate();
    const newAmount = waterIntake + amount;

    try {
      // First try to update existing record
      const { data: existingRecord, error: fetchError } = await supabase
        .from('daily_water_intake')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingRecord) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('daily_water_intake')
          .update({ water_consumed_ml: newAmount })
          .eq('user_id', user.id)
          .eq('date', today);

        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('daily_water_intake')
          .insert({
            user_id: user.id,
            date: today,
            water_consumed_ml: newAmount
          });

        if (insertError) throw insertError;
      }

      setWaterIntake(newAmount);
      toast({
        title: "Success",
        description: `Added ${amount}ml of water`,
      });

    } catch (error) {
      console.error('Error updating water intake:', error);
      toast({
        title: "Error",
        description: "Failed to update water intake",
        variant: "destructive"
      });
    }
  };

  // Fetch food items from Supabase
  const fetchFoodItems = async () => {
    const { data, error } = await supabase
      .from('food_items')
      .select('*');

    if (error) {
      console.error('Error fetching food items:', error);
      return;
    }

    // Transform Supabase data to match our Food interface
    const transformedFoods: Food[] = data.map(item => ({
      id: item.food_id,
      name: item.name,
      calories: Math.round(item.calories_per_100g), // Assuming 100g serving
      protein: Number(item.protein_per_100g) || 0,
      carbs: Number(item.carbs_per_100g) || 0,
      fat: Number(item.fat_per_100g) || 0,
      serving: '100g'
    }));

    setAllFoodItems(transformedFoods);
  };

  // Fetch today's meals from Supabase
  const fetchTodaysMeals = async () => {
    if (!user) return;

    const today = getTodayDate();
    console.log('Fetching meals for date:', today, 'user:', user.id);

    const { data: mealsData, error } = await supabase
      .from('meals')
      .select(`
        *,
        meal_items (
          *,
          food_items (*)
        )
      `)
      .eq('user_id', user.id)
      .eq('date', today);

    if (error) {
      console.error('Error fetching meals:', error);
      return;
    }

    console.log('Fetched meals data:', mealsData);

    // Transform meals data into our format
    const transformedMeals = {
      breakfast: [] as Food[],
      lunch: [] as Food[],
      dinner: [] as Food[],
      snacks: [] as Food[]
    };

    mealsData?.forEach(meal => {
      const mealType = meal.meal_type as keyof typeof transformedMeals;
      if (transformedMeals[mealType]) {
        meal.meal_items?.forEach((item: any) => {
          const food: Food = {
            id: `${item.food_id}-${item.meal_item_id}`,
            name: item.food_items.name,
            calories: item.calories,
            protein: item.protein || 0,
            carbs: item.carbs || 0,
            fat: item.fat || 0,
            serving: `${item.quantity_grams}g`
          };
          transformedMeals[mealType].push(food);
        });
      }
    });

    setMeals(transformedMeals);
  };

  useEffect(() => {
    fetchFoodItems();
    if (user) {
      fetchTodaysMeals();
      fetchUserProfile();
      fetchWaterIntake();
    }
  }, [user]);

  // Calculate daily stats using user profile targets
  const dailyStats: DailyStats = {
    calories: Object.values(meals).flat().reduce((sum, food) => sum + food.calories, 0),
    protein: Object.values(meals).flat().reduce((sum, food) => sum + food.protein, 0),
    carbs: Object.values(meals).flat().reduce((sum, food) => sum + food.carbs, 0),
    fat: Object.values(meals).flat().reduce((sum, food) => sum + food.fat, 0),
    caloriesGoal: userProfile?.daily_calorie_target || 2000,
    proteinGoal: userProfile?.protein_target || 150,
    carbsGoal: userProfile?.carb_target || 250,
    fatGoal: userProfile?.fat_target || 65,
    waterConsumed: waterIntake,
    waterGoal: userProfile?.water_target_ml || 2000
  };

  // Sample weekly data
  const weeklyData: WeeklyData[] = [
    { day: 'Mon', calories: 1950 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 1850 },
    { day: 'Thu', calories: 2200 },
    { day: 'Fri', calories: 1900 },
    { day: 'Sat', calories: 2300 },
    { day: 'Sun', calories: dailyStats.calories }
  ];

  const addFoodToMeal = async (mealType: keyof typeof meals, food: Food) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save meals",
        variant: "destructive"
      });
      return;
    }

    try {
      const today = getTodayDate();
      
      // Check if meal exists for today
      let { data: existingMeal, error: mealError } = await supabase
        .from('meals')
        .select('meal_id')
        .eq('user_id', user.id)
        .eq('date', today)
        .eq('meal_type', mealType)
        .single();

      let mealId;

      if (mealError && mealError.code === 'PGRST116') {
        // Meal doesn't exist, create it
        const { data: newMeal, error: createError } = await supabase
          .from('meals')
          .insert({
            user_id: user.id,
            date: today,
            meal_type: mealType
          })
          .select('meal_id')
          .single();

        if (createError) throw createError;
        mealId = newMeal.meal_id;
      } else if (mealError) {
        throw mealError;
      } else {
        mealId = existingMeal.meal_id;
      }

      // Use the original food.id directly as food_id (it should be a valid UUID)
      const foodId = food.id;
      console.log('Using food ID:', foodId);

      // Add meal item
      const { error: itemError } = await supabase
        .from('meal_items')
        .insert({
          meal_id: mealId,
          food_id: foodId,
          quantity_grams: 100, // Default to 100g
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat
        });

      if (itemError) throw itemError;

      // Update local state
      setMeals(prev => ({
        ...prev,
        [mealType]: [...prev[mealType], { ...food, id: `${food.id}-${Date.now()}` }]
      }));

      toast({
        title: "Success",
        description: `Added ${food.name} to ${mealType}`,
      });

    } catch (error) {
      console.error('Error adding food to meal:', error);
      toast({
        title: "Error",
        description: "Failed to save meal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFoodFromMeal = async (mealType: keyof typeof meals, foodToRemove: Food) => {
    if (!user) return;

    try {
      // This is a simplified removal - in a real app you'd want to track meal_item_ids
      // For now, we'll just update the local state and refetch
      setMeals(prev => ({
        ...prev,
        [mealType]: prev[mealType].filter(food => food.id !== foodToRemove.id)
      }));

      // Refresh meals from database
      await fetchTodaysMeals();

      toast({
        title: "Success",
        description: `Removed ${foodToRemove.name} from ${mealType}`,
      });

    } catch (error) {
      console.error('Error removing food from meal:', error);
      toast({
        title: "Error",
        description: "Failed to remove meal item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const searchFoods = (query: string) => {
    if (!query.trim()) {
      setFoodSearchResults([]);
      return;
    }
    
    const filtered = allFoodItems.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFoodSearchResults(filtered);
  };

  const refreshFoodItems = () => {
    fetchFoodItems();
    if (user) {
      fetchTodaysMeals();
      fetchUserProfile();
      fetchWaterIntake();
    }
  };

  return {
    meals,
    dailyStats,
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods,
    foodSearchResults,
    refreshFoodItems,
    updateWaterIntake,
    waterIntake
  };
};

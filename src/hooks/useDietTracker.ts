
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
}

export interface WeeklyData {
  day: string;
  calories: number;
}

export const useDietTracker = () => {
  const [meals, setMeals] = useState({
    breakfast: [] as Food[],
    lunch: [] as Food[],
    dinner: [] as Food[],
    snacks: [] as Food[]
  });

  const [foodSearchResults, setFoodSearchResults] = useState<Food[]>([]);
  const [allFoodItems, setAllFoodItems] = useState<Food[]>([]);

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

  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Calculate daily stats
  const dailyStats: DailyStats = {
    calories: Object.values(meals).flat().reduce((sum, food) => sum + food.calories, 0),
    protein: Object.values(meals).flat().reduce((sum, food) => sum + food.protein, 0),
    carbs: Object.values(meals).flat().reduce((sum, food) => sum + food.carbs, 0),
    fat: Object.values(meals).flat().reduce((sum, food) => sum + food.fat, 0),
    caloriesGoal: 2000,
    proteinGoal: 150,
    carbsGoal: 250,
    fatGoal: 65
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

  const addFoodToMeal = (mealType: keyof typeof meals, food: Food) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: [...prev[mealType], { ...food, id: `${food.id}-${Date.now()}` }]
    }));
  };

  const removeFoodFromMeal = (mealType: keyof typeof meals, foodToRemove: Food) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(food => food.id !== foodToRemove.id)
    }));
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
  };

  return {
    meals,
    dailyStats,
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods,
    foodSearchResults,
    refreshFoodItems
  };
};

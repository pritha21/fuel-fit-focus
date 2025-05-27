import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Meals, MealType, Food } from '@/types/diet';
import { fetchUserProfile } from '@/services/userService';
import { fetchTodaysMeals, addFoodToMealInDB } from '@/services/mealService';
import { useWaterTracker } from '@/hooks/useWaterTracker';
import { useFoodSearch } from '@/hooks/useFoodSearch';
import { calculateDailyStats, getWeeklyData } from '@/utils/statsCalculator';

export const useDietTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [meals, setMeals] = useState<Meals>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  const [userProfile, setUserProfile] = useState<any>(null);

  const { waterIntake, updateWaterIntake } = useWaterTracker();
  const { foodSearchResults, performSearch, refreshFoodItems } = useFoodSearch();

  // Fetch user profile
  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id).then(setUserProfile);
      fetchTodaysMeals(user.id).then(setMeals);
    }
  }, [user]);

  const addFoodToMeal = async (mealType: MealType, food: Food) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save meals",
        variant: "destructive"
      });
      return;
    }

    const success = await addFoodToMealInDB(user.id, mealType, food);

    if (success) {
      // Update local state
      setMeals(prev => ({
        ...prev,
        [mealType]: [...prev[mealType], { ...food, id: `${food.id}-${Date.now()}` }]
      }));

      toast({
        title: "Success",
        description: `Added ${food.name} to ${mealType}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to save meal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFoodFromMeal = async (mealType: MealType, foodToRemove: Food) => {
    if (!user) return;

    try {
      // This is a simplified removal - in a real app you'd want to track meal_item_ids
      // For now, we'll just update the local state and refetch
      setMeals(prev => ({
        ...prev,
        [mealType]: prev[mealType].filter(food => food.id !== foodToRemove.id)
      }));

      // Refresh meals from database
      const updatedMeals = await fetchTodaysMeals(user.id);
      setMeals(updatedMeals);

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

  const refreshData = () => {
    refreshFoodItems();
    if (user) {
      fetchTodaysMeals(user.id).then(setMeals);
      fetchUserProfile(user.id).then(setUserProfile);
    }
  };

  // Calculate daily stats
  const dailyStats = calculateDailyStats(meals, userProfile, waterIntake);
  const weeklyData = getWeeklyData(dailyStats.calories);

  return {
    meals,
    dailyStats,
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods: performSearch,
    foodSearchResults,
    refreshFoodItems: refreshData,
    updateWaterIntake,
    waterIntake
  };
};

// Re-export types for backward compatibility
export type { Food, DailyStats, WeeklyData } from '@/types/diet';

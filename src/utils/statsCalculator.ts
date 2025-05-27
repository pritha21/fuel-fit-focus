
import { Meals, DailyStats } from '@/types/diet';

export const calculateDailyStats = (
  meals: Meals,
  userProfile: any,
  waterIntake: number
): DailyStats => {
  const allFoods = Object.values(meals).flat();
  
  return {
    calories: allFoods.reduce((sum, food) => sum + food.calories, 0),
    protein: allFoods.reduce((sum, food) => sum + food.protein, 0),
    carbs: allFoods.reduce((sum, food) => sum + food.carbs, 0),
    fat: allFoods.reduce((sum, food) => sum + food.fat, 0),
    caloriesGoal: userProfile?.daily_calorie_target || 2000,
    proteinGoal: userProfile?.protein_target || 150,
    carbsGoal: userProfile?.carb_target || 250,
    fatGoal: userProfile?.fat_target || 65,
    waterConsumed: waterIntake,
    waterGoal: userProfile?.water_target_ml || 2000
  };
};

export const getWeeklyData = (currentCalories: number) => {
  return [
    { day: 'Mon', calories: 1950 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 1850 },
    { day: 'Thu', calories: 2200 },
    { day: 'Fri', calories: 1900 },
    { day: 'Sat', calories: 2300 },
    { day: 'Sun', calories: currentCalories }
  ];
};

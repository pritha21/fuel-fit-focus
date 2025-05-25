
import { useState, useEffect } from 'react';

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

  // Sample food database
  const foodDatabase: Food[] = [
    { id: '1', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1 medium' },
    { id: '2', name: 'Chicken Breast', calories: 231, protein: 43.5, carbs: 0, fat: 5, serving: '100g' },
    { id: '3', name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: '1 cup cooked' },
    { id: '4', name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fat: 21, serving: '1 medium' },
    { id: '5', name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0, serving: '170g' },
    { id: '6', name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, serving: '28g' },
    { id: '7', name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 12, serving: '100g' },
    { id: '8', name: 'Sweet Potato', calories: 112, protein: 2, carbs: 26, fat: 0.1, serving: '1 medium' },
    { id: '9', name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '2 large' },
    { id: '10', name: 'Oatmeal', calories: 154, protein: 5.3, carbs: 28, fat: 3, serving: '1 cup cooked' }
  ];

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
    
    const filtered = foodDatabase.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFoodSearchResults(filtered);
  };

  return {
    meals,
    dailyStats,
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods,
    foodSearchResults
  };
};

"use client"

import { useState } from "react"

interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
}

interface DailyStats {
  calories: number
  protein: number
  carbs: number
  fat: number
  calorieGoal: number
  proteinGoal: number
  carbsGoal: number
  fatGoal: number
  waterConsumed: number
  waterGoal: number
}

interface WeeklyData {
  labels: string[]
  calories: number[]
  weight: number[]
}

interface Meals {
  breakfast: Food[]
  lunch: Food[]
  dinner: Food[]
  snacks: Food[]
}

export const useDietTracker = () => {
  const [meals, setMeals] = useState<Meals>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  })

  const [foodSearchResults, setFoodSearchResults] = useState<Food[]>([])
  const [waterIntake, setWaterIntake] = useState(0)

  // Mock food database
  const mockFoods: Food[] = [
    { id: "1", name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.3, serving: "1 medium" },
    { id: "2", name: "Chicken Breast", calories: 231, protein: 43.5, carbs: 0, fat: 5, serving: "100g" },
    { id: "3", name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: "1 cup cooked" },
    { id: "4", name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0, serving: "170g" },
    { id: "5", name: "Almonds", calories: 164, protein: 6, carbs: 6, fat: 14, serving: "28g" },
    { id: "6", name: "Broccoli", calories: 55, protein: 4, carbs: 11, fat: 0.6, serving: "1 cup" },
    { id: "7", name: "Salmon", calories: 208, protein: 22, carbs: 0, fat: 12, serving: "100g" },
    { id: "8", name: "Oatmeal", calories: 154, protein: 5, carbs: 28, fat: 3, serving: "1 cup cooked" },
  ]

  const calculateDailyStats = (): DailyStats => {
    const allFoods = [...meals.breakfast, ...meals.lunch, ...meals.dinner, ...meals.snacks]

    const totals = allFoods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
        fat: acc.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )

    return {
      ...totals,
      calorieGoal: 2000,
      proteinGoal: 150,
      carbsGoal: 250,
      fatGoal: 67,
      waterConsumed: waterIntake,
      waterGoal: 8,
    }
  }

  const weeklyData: WeeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    calories: [1800, 2100, 1950, 2200, 1900, 2300, 2000],
    weight: [70.2, 70.1, 70.0, 69.9, 69.8, 69.7, 69.6],
  }

  const addFoodToMeal = (mealType: keyof Meals, food: Food) => {
    setMeals((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], food],
    }))
  }

  const removeFoodFromMeal = (mealType: keyof Meals, foodToRemove: Food) => {
    setMeals((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((food) => food.id !== foodToRemove.id),
    }))
  }

  const searchFoods = (query: string) => {
    if (!query.trim()) {
      setFoodSearchResults([])
      return
    }

    const results = mockFoods.filter((food) => food.name.toLowerCase().includes(query.toLowerCase()))
    setFoodSearchResults(results)
  }

  const updateWaterIntake = (amount: number) => {
    setWaterIntake((prev) => Math.max(0, prev + amount))
  }

  return {
    meals,
    dailyStats: calculateDailyStats(),
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods,
    foodSearchResults,
    updateWaterIntake,
    waterIntake,
  }
}

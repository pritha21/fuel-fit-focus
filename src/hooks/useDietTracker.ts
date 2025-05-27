"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import type { Meals, MealType, Food, DailyStats, WeeklyData } from "@/types/diet"

// Mock food data for the preview
const mockFoodItems: Food[] = [
  { id: "1", name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, serving: "100g" },
  { id: "2", name: "Chicken Breast", calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, serving: "100g" },
  { id: "3", name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, serving: "100g" },
  { id: "4", name: "Greek Yogurt", calories: 59, protein: 10.0, carbs: 3.6, fat: 0.4, serving: "100g" },
  { id: "5", name: "Almonds", calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, serving: "100g" },
  { id: "6", name: "Avocado", calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, serving: "100g" },
  { id: "7", name: "Salmon", calories: 208, protein: 25.4, carbs: 0.0, fat: 12.4, serving: "100g" },
  { id: "8", name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, serving: "100g" },
]

export const useDietTracker = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const [meals, setMeals] = useState<Meals>({
    breakfast: [
      { id: "1", name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, serving: "100g" },
      { id: "4", name: "Greek Yogurt", calories: 59, protein: 10.0, carbs: 3.6, fat: 0.4, serving: "100g" },
    ],
    lunch: [
      { id: "2", name: "Chicken Breast", calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, serving: "100g" },
      { id: "3", name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, serving: "100g" },
    ],
    dinner: [
      { id: "7", name: "Salmon", calories: 208, protein: 25.4, carbs: 0.0, fat: 12.4, serving: "100g" },
      { id: "8", name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, serving: "100g" },
    ],
    snacks: [{ id: "5", name: "Almonds", calories: 289, protein: 10.6, carbs: 10.8, fat: 25.0, serving: "50g" }],
  })

  const [waterIntake, setWaterIntake] = useState(1500)
  const [foodSearchResults, setFoodSearchResults] = useState<Food[]>([])

  const addFoodToMeal = async (mealType: MealType, food: Food) => {
    setMeals((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], { ...food, id: `${food.id}-${Date.now()}` }],
    }))

    toast({
      title: "Success",
      description: `Added ${food.name} to ${mealType}`,
    })
  }

  const removeFoodFromMeal = async (mealType: MealType, foodToRemove: Food) => {
    setMeals((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((food) => food.id !== foodToRemove.id),
    }))

    toast({
      title: "Success",
      description: `Removed ${foodToRemove.name} from ${mealType}`,
    })
  }

  const searchFoods = (query: string) => {
    if (!query.trim()) {
      setFoodSearchResults([])
      return
    }
    const results = mockFoodItems.filter((food) => food.name.toLowerCase().includes(query.toLowerCase()))
    setFoodSearchResults(results)
  }

  const updateWaterIntake = (amount: number) => {
    setWaterIntake((prev) => prev + amount)
    toast({
      title: "Success",
      description: `Added ${amount}ml of water`,
    })
  }

  // Calculate daily stats
  const allFoods = Object.values(meals).flat()
  const dailyStats: DailyStats = {
    calories: allFoods.reduce((sum, food) => sum + food.calories, 0),
    protein: allFoods.reduce((sum, food) => sum + food.protein, 0),
    carbs: allFoods.reduce((sum, food) => sum + food.carbs, 0),
    fat: allFoods.reduce((sum, food) => sum + food.fat, 0),
    caloriesGoal: 2000,
    proteinGoal: 150,
    carbsGoal: 250,
    fatGoal: 65,
    waterConsumed: waterIntake,
    waterGoal: 2000,
  }

  const weeklyData: WeeklyData[] = [
    { day: "Mon", calories: 1950 },
    { day: "Tue", calories: 2100 },
    { day: "Wed", calories: 1850 },
    { day: "Thu", calories: 2200 },
    { day: "Fri", calories: 1900 },
    { day: "Sat", calories: 2300 },
    { day: "Sun", calories: dailyStats.calories },
  ]

  return {
    meals,
    dailyStats,
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods,
    foodSearchResults,
    updateWaterIntake,
    waterIntake,
  }
}

// Re-export types for backward compatibility
export type { Food, DailyStats, WeeklyData } from "@/types/diet"

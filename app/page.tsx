"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/DashboardHeader"
import { MealSection } from "@/components/MealSection"
import { ProgressCharts } from "@/components/ProgressCharts"
import { FoodSearch } from "@/components/FoodSearch"
import { WaterTracker } from "@/components/WaterTracker"
import { MealSummary } from "@/components/MealSummary"

// Mock data for demonstration
const mockDailyStats = {
  calories: 1650,
  protein: 120,
  carbs: 180,
  fat: 55,
  caloriesGoal: 2000,
  proteinGoal: 150,
  carbsGoal: 250,
  fatGoal: 65,
  waterConsumed: 1500,
  waterGoal: 2000,
}

const mockWeeklyData = [
  { day: "Mon", calories: 1950 },
  { day: "Tue", calories: 2100 },
  { day: "Wed", calories: 1850 },
  { day: "Thu", calories: 2200 },
  { day: "Fri", calories: 1900 },
  { day: "Sat", calories: 2300 },
  { day: "Sun", calories: 1650 },
]

const mockFoodItems = [
  { id: "1", name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, serving: "100g" },
  { id: "2", name: "Chicken Breast", calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, serving: "100g" },
  { id: "3", name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, serving: "100g" },
  { id: "4", name: "Greek Yogurt", calories: 59, protein: 10.0, carbs: 3.6, fat: 0.4, serving: "100g" },
  { id: "5", name: "Almonds", calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, serving: "100g" },
]

export default function DietTracker() {
  const [meals, setMeals] = useState({
    breakfast: [
      { id: "1", name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, serving: "100g" },
      { id: "4", name: "Greek Yogurt", calories: 59, protein: 10.0, carbs: 3.6, fat: 0.4, serving: "100g" },
    ],
    lunch: [
      { id: "2", name: "Chicken Breast", calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, serving: "100g" },
      { id: "3", name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, serving: "100g" },
    ],
    dinner: [{ id: "2", name: "Chicken Breast", calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, serving: "100g" }],
    snacks: [{ id: "5", name: "Almonds", calories: 289, protein: 10.6, carbs: 10.8, fat: 25.0, serving: "50g" }],
  })

  const [showFoodSearch, setShowFoodSearch] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState("breakfast")
  const [searchResults, setSearchResults] = useState([])
  const [waterIntake, setWaterIntake] = useState(1500)

  const handleAddFood = (mealType) => {
    setSelectedMealType(mealType)
    setShowFoodSearch(true)
  }

  const handleFoodSelect = (food) => {
    setMeals((prev) => ({
      ...prev,
      [selectedMealType]: [...prev[selectedMealType], { ...food, id: `${food.id}-${Date.now()}` }],
    }))
    setShowFoodSearch(false)
  }

  const handleRemoveFood = (mealType, foodToRemove) => {
    setMeals((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((food) => food.id !== foodToRemove.id),
    }))
  }

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results = mockFoodItems.filter((food) => food.name.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(results)
  }

  const handleAddWater = (amount) => {
    setWaterIntake((prev) => prev + amount)
  }

  const handleSaveMeals = () => {
    // Mock save functionality
    alert("Meals saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardHeader dailyStats={mockDailyStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Meals Section */}
          <div className="lg:col-span-3 space-y-4">
            <MealSection
              title="Breakfast"
              icon="🌅"
              mealType="breakfast"
              foods={meals.breakfast}
              onAddFood={() => handleAddFood("breakfast")}
              onRemoveFood={(food) => handleRemoveFood("breakfast", food)}
            />
            <MealSection
              title="Lunch"
              icon="🍽️"
              mealType="lunch"
              foods={meals.lunch}
              onAddFood={() => handleAddFood("lunch")}
              onRemoveFood={(food) => handleRemoveFood("lunch", food)}
            />
            <MealSection
              title="Dinner"
              icon="🌙"
              mealType="dinner"
              foods={meals.dinner}
              onAddFood={() => handleAddFood("dinner")}
              onRemoveFood={(food) => handleRemoveFood("dinner", food)}
            />
            <MealSection
              title="Snacks"
              icon="🍿"
              mealType="snacks"
              foods={meals.snacks}
              onAddFood={() => handleAddFood("snacks")}
              onRemoveFood={(food) => handleRemoveFood("snacks", food)}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <MealSummary dailyStats={mockDailyStats} onSaveMeals={handleSaveMeals} isSaving={false} />

            <WaterTracker
              waterConsumed={waterIntake}
              waterGoal={mockDailyStats.waterGoal}
              onAddWater={handleAddWater}
            />

            <ProgressCharts dailyStats={mockDailyStats} weeklyData={mockWeeklyData} />
          </div>
        </div>

        {/* Food Search Modal */}
        {showFoodSearch && (
          <FoodSearch
            onClose={() => setShowFoodSearch(false)}
            onFoodSelect={handleFoodSelect}
            searchFoods={handleSearch}
            searchResults={searchResults}
          />
        )}
      </div>
    </div>
  )
}

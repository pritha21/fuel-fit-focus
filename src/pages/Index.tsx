"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/Header"
import { DashboardHeader } from "@/components/DashboardHeader"
import { MealSection } from "@/components/MealSection"
import { ProgressCharts } from "@/components/ProgressCharts"
import { FoodSearch } from "@/components/FoodSearch"
import { WaterTracker } from "@/components/WaterTracker"
import { MealSummary } from "@/components/MealSummary"
import { useDietTracker } from "@/hooks/useDietTracker"

const Index = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [showFoodSearch, setShowFoodSearch] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snacks">("breakfast")

  const {
    meals,
    dailyStats,
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods,
    foodSearchResults,
    updateWaterIntake,
  } = useDietTracker()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth")
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleAddFood = (mealType: "breakfast" | "lunch" | "dinner" | "snacks") => {
    setSelectedMealType(mealType)
    setShowFoodSearch(true)
  }

  const handleFoodSelect = (food: any) => {
    addFoodToMeal(selectedMealType, food)
    setShowFoodSearch(false)
  }

  const handleSaveMeals = () => {
    // This is handled automatically by the useDietTracker hook
    console.log("Meals are automatically saved!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardHeader dailyStats={dailyStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Meals Section */}
          <div className="lg:col-span-3 space-y-4">
            <MealSection
              title="Breakfast"
              icon="🌅"
              mealType="breakfast"
              foods={meals.breakfast}
              onAddFood={() => handleAddFood("breakfast")}
              onRemoveFood={(food) => removeFoodFromMeal("breakfast", food)}
            />
            <MealSection
              title="Lunch"
              icon="🍽️"
              mealType="lunch"
              foods={meals.lunch}
              onAddFood={() => handleAddFood("lunch")}
              onRemoveFood={(food) => removeFoodFromMeal("lunch", food)}
            />
            <MealSection
              title="Dinner"
              icon="🌙"
              mealType="dinner"
              foods={meals.dinner}
              onAddFood={() => handleAddFood("dinner")}
              onRemoveFood={(food) => removeFoodFromMeal("dinner", food)}
            />
            <MealSection
              title="Snacks"
              icon="🍿"
              mealType="snacks"
              foods={meals.snacks}
              onAddFood={() => handleAddFood("snacks")}
              onRemoveFood={(food) => removeFoodFromMeal("snacks", food)}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <MealSummary dailyStats={dailyStats} onSaveMeals={handleSaveMeals} isSaving={false} />

            <WaterTracker
              waterConsumed={dailyStats.waterConsumed}
              waterGoal={dailyStats.waterGoal}
              onAddWater={updateWaterIntake}
            />

            <ProgressCharts dailyStats={dailyStats} weeklyData={weeklyData} />
          </div>
        </div>

        {/* Food Search Modal */}
        {showFoodSearch && (
          <FoodSearch
            onClose={() => setShowFoodSearch(false)}
            onFoodSelect={handleFoodSelect}
            searchFoods={searchFoods}
            searchResults={foodSearchResults}
          />
        )}
      </div>
    </div>
  )
}

export default Index

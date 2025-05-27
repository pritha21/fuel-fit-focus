"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Save } from "lucide-react"

interface DailyStats {
  calories: number
  protein: number
  carbs: number
  fat: number
  calorieGoal: number
  proteinGoal: number
  carbsGoal: number
  fatGoal: number
}

interface MealSummaryProps {
  dailyStats: DailyStats
  onSaveMeals: () => void
  isSaving: boolean
}

export const MealSummary: React.FC<MealSummaryProps> = ({ dailyStats, onSaveMeals, isSaving }) => {
  const caloriesRemaining = dailyStats.calorieGoal - dailyStats.calories
  const progressPercentage = Math.min((dailyStats.calories / dailyStats.calorieGoal) * 100, 100)

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle>Daily Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{Math.round(dailyStats.calories)}</div>
            <div className="text-sm text-gray-600">calories consumed</div>
          </div>

          <Progress value={progressPercentage} className="h-3" />

          <div className="text-center">
            <div className={`text-lg font-semibold ${caloriesRemaining >= 0 ? "text-green-600" : "text-red-600"}`}>
              {caloriesRemaining >= 0 ? caloriesRemaining : Math.abs(caloriesRemaining)}
            </div>
            <div className="text-sm text-gray-600">calories {caloriesRemaining >= 0 ? "remaining" : "over goal"}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <div className="font-semibold text-blue-600">{Math.round(dailyStats.protein)}g</div>
              <div className="text-gray-600">Protein</div>
            </div>
            <div>
              <div className="font-semibold text-green-600">{Math.round(dailyStats.carbs)}g</div>
              <div className="text-gray-600">Carbs</div>
            </div>
            <div>
              <div className="font-semibold text-purple-600">{Math.round(dailyStats.fat)}g</div>
              <div className="text-gray-600">Fat</div>
            </div>
          </div>

          <Button onClick={onSaveMeals} className="w-full" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Today's Meals"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

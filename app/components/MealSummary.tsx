"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Save } from "lucide-react"

interface DailyStats {
  calories: number
  protein: number
  carbs: number
  fat: number
  caloriesGoal: number
  proteinGoal: number
  carbsGoal: number
  fatGoal: number
  waterConsumed: number
  waterGoal: number
}

interface MealSummaryProps {
  dailyStats: DailyStats
  onSaveMeals: () => void
  isSaving?: boolean
}

export const MealSummary: React.FC<MealSummaryProps> = ({ dailyStats, onSaveMeals, isSaving = false }) => {
  const isGoalMet = (current: number, goal: number) => current >= goal * 0.9

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-green-800 flex items-center justify-between">
          <span>📊 Daily Summary</span>
          <Button
            onClick={onSaveMeals}
            disabled={isSaving}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            size="sm"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Meals
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Calories</p>
                <p className="text-lg font-bold text-green-700">{Math.round(dailyStats.calories)}</p>
                <p className="text-xs text-green-500">of {dailyStats.caloriesGoal}</p>
              </div>
              {isGoalMet(dailyStats.calories, dailyStats.caloriesGoal) && (
                <Check size={16} className="text-green-500" />
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Protein</p>
                <p className="text-lg font-bold text-blue-700">{Math.round(dailyStats.protein)}g</p>
                <p className="text-xs text-blue-500">of {dailyStats.proteinGoal}g</p>
              </div>
              {isGoalMet(dailyStats.protein, dailyStats.proteinGoal) && <Check size={16} className="text-green-500" />}
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Carbs</p>
                <p className="text-lg font-bold text-yellow-700">{Math.round(dailyStats.carbs)}g</p>
                <p className="text-xs text-yellow-500">of {dailyStats.carbsGoal}g</p>
              </div>
              {isGoalMet(dailyStats.carbs, dailyStats.carbsGoal) && <Check size={16} className="text-green-500" />}
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Fat</p>
                <p className="text-lg font-bold text-purple-700">{Math.round(dailyStats.fat)}g</p>
                <p className="text-xs text-purple-500">of {dailyStats.fatGoal}g</p>
              </div>
              {isGoalMet(dailyStats.fat, dailyStats.fatGoal) && <Check size={16} className="text-green-500" />}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-600 font-medium">Water</p>
              <p className="text-lg font-bold text-cyan-700">{(dailyStats.waterConsumed / 1000).toFixed(1)}L</p>
              <p className="text-xs text-cyan-500">of {(dailyStats.waterGoal / 1000).toFixed(1)}L</p>
            </div>
            {isGoalMet(dailyStats.waterConsumed, dailyStats.waterGoal) && (
              <Check size={16} className="text-green-500" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

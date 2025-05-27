import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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

interface DashboardHeaderProps {
  dailyStats: DailyStats
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ dailyStats }) => {
  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  const macros = [
    {
      name: "Calories",
      current: dailyStats.calories,
      goal: dailyStats.calorieGoal,
      unit: "kcal",
      color: "bg-orange-500",
    },
    {
      name: "Protein",
      current: dailyStats.protein,
      goal: dailyStats.proteinGoal,
      unit: "g",
      color: "bg-blue-500",
    },
    {
      name: "Carbs",
      current: dailyStats.carbs,
      goal: dailyStats.carbsGoal,
      unit: "g",
      color: "bg-green-500",
    },
    {
      name: "Fat",
      current: dailyStats.fat,
      goal: dailyStats.fatGoal,
      unit: "g",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {macros.map((macro) => (
        <Card key={macro.name} className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{macro.name}</span>
              <div className={`w-3 h-3 rounded-full ${macro.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round(macro.current)}
              <span className="text-sm text-gray-500 font-normal">
                /{macro.goal} {macro.unit}
              </span>
            </div>
            <Progress value={getProgressPercentage(macro.current, macro.goal)} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

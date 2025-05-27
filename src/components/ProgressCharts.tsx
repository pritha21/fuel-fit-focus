import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target } from "lucide-react"

interface DailyStats {
  calories: number
  calorieGoal: number
}

interface WeeklyData {
  labels: string[]
  calories: number[]
  weight: number[]
}

interface ProgressChartsProps {
  dailyStats: DailyStats
  weeklyData: WeeklyData
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({ dailyStats, weeklyData }) => {
  const avgCalories = weeklyData.calories.reduce((sum, cal) => sum + cal, 0) / weeklyData.calories.length
  const weightChange = weeklyData.weight[weeklyData.weight.length - 1] - weeklyData.weight[0]

  return (
    <div className="space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{Math.round(avgCalories)} cal/day</div>
              <div className="text-sm text-gray-600">Average this week</div>
            </div>

            <div className="text-center">
              <div className={`text-lg font-semibold ${weightChange <= 0 ? "text-green-600" : "text-red-600"}`}>
                {weightChange > 0 ? "+" : ""}
                {weightChange.toFixed(1)} kg
              </div>
              <div className="text-sm text-gray-600">Weight change</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Daily Calories</span>
              <span className="font-semibold">{dailyStats.calorieGoal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Weekly Workouts</span>
              <span className="font-semibold">5 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Target Weight</span>
              <span className="font-semibold">68 kg</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

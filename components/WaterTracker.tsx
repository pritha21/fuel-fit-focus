"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgress } from "./CircularProgress"
import { Plus } from "lucide-react"

export const WaterTracker = ({ waterConsumed, waterGoal, onAddWater }) => {
  const waterProgress = (waterConsumed / waterGoal) * 100
  const waterInLiters = (waterConsumed / 1000).toFixed(1)
  const goalInLiters = (waterGoal / 1000).toFixed(1)

  const quickAddAmounts = [250, 500, 750]

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">💧 Water Intake</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <CircularProgress value={waterProgress} size={100} strokeWidth={8}>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-700">{waterInLiters}L</div>
              <div className="text-xs text-blue-600">of {goalInLiters}L</div>
            </div>
          </CircularProgress>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-blue-600 text-center font-medium">Quick Add</p>
          <div className="grid grid-cols-3 gap-2">
            {quickAddAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => onAddWater(amount)}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                +{amount}ml
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={() => onAddWater(200)}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <Plus size={16} className="mr-2" />
          Add Glass (200ml)
        </Button>
      </CardContent>
    </Card>
  )
}

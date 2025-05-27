"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Droplets, Plus, Minus } from "lucide-react"

interface WaterTrackerProps {
  waterConsumed: number
  waterGoal: number
  onAddWater: (amount: number) => void
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({ waterConsumed, waterGoal, onAddWater }) => {
  const progressPercentage = Math.min((waterConsumed / waterGoal) * 100, 100)

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-blue-600">{waterConsumed}</div>
          <div className="text-sm text-gray-600">of {waterGoal} glasses</div>
        </div>

        <Progress value={progressPercentage} className="mb-4 h-3" />

        <div className="flex gap-2">
          <Button
            onClick={() => onAddWater(-1)}
            size="sm"
            variant="outline"
            disabled={waterConsumed <= 0}
            className="flex-1"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button onClick={() => onAddWater(1)} size="sm" className="flex-1">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

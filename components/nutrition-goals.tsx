"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function NutritionGoals() {
  const goals = [
    {
      name: "Calories",
      current: 1847,
      target: 2200,
      unit: "kcal",
      color: "bg-orange-500",
    },
    {
      name: "Protein",
      current: 89,
      target: 120,
      unit: "g",
      color: "bg-blue-500",
    },
    {
      name: "Carbohydrates",
      current: 180,
      target: 275,
      unit: "g",
      color: "bg-green-500",
    },
    {
      name: "Fat",
      current: 65,
      target: 73,
      unit: "g",
      color: "bg-purple-500",
    },
    {
      name: "Fiber",
      current: 18,
      target: 25,
      unit: "g",
      color: "bg-yellow-500",
    },
    {
      name: "Water",
      current: 6,
      target: 8,
      unit: "glasses",
      color: "bg-cyan-500",
    },
  ]

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getStatusBadge = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return { text: "Complete", variant: "default" as const }
    if (percentage >= 80) return { text: "On Track", variant: "secondary" as const }
    return { text: "Behind", variant: "outline" as const }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Nutrition Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = getProgressPercentage(goal.current, goal.target)
            const status = getStatusBadge(goal.current, goal.target)

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${goal.color}`} />
                    <span className="font-medium">{goal.name}</span>
                    <Badge variant={status.variant} className="text-xs">
                      {status.text}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
}

interface MealSectionProps {
  title: string
  icon: string
  mealType: string
  foods: Food[]
  onAddFood: () => void
  onRemoveFood: (food: Food) => void
}

export const MealSection: React.FC<MealSectionProps> = ({ title, icon, foods, onAddFood, onRemoveFood }) => {
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0)

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="text-2xl">{icon}</span>
            {title}
            <Badge variant="secondary" className="ml-2">
              {totalCalories} cal
            </Badge>
          </CardTitle>
          <Button onClick={onAddFood} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Food
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {foods.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No foods added yet</p>
        ) : (
          <div className="space-y-2">
            {foods.map((food, index) => (
              <div key={`${food.id}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-gray-600">
                    {food.serving} • {food.calories} cal • P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                  </div>
                </div>
                <Button
                  onClick={() => onRemoveFood(food)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Utensils } from "lucide-react"

export function RecentMeals() {
  const meals = [
    {
      name: "Greek Yogurt with Berries",
      time: "8:30 AM",
      calories: 320,
      type: "Breakfast",
      macros: { protein: 20, carbs: 35, fat: 8 },
    },
    {
      name: "Grilled Chicken Salad",
      time: "12:45 PM",
      calories: 450,
      type: "Lunch",
      macros: { protein: 35, carbs: 15, fat: 22 },
    },
    {
      name: "Apple with Almond Butter",
      time: "3:20 PM",
      calories: 190,
      type: "Snack",
      macros: { protein: 6, carbs: 25, fat: 12 },
    },
    {
      name: "Salmon with Quinoa",
      time: "7:15 PM",
      calories: 520,
      type: "Dinner",
      macros: { protein: 28, carbs: 45, fat: 18 },
    },
  ]

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case "Breakfast":
        return "bg-yellow-100 text-yellow-800"
      case "Lunch":
        return "bg-green-100 text-green-800"
      case "Dinner":
        return "bg-blue-100 text-blue-800"
      case "Snack":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          Recent Meals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{meal.name}</h3>
                  <Badge variant="secondary" className={getMealTypeColor(meal.type)}>
                    {meal.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {meal.time}
                  </div>
                  <div>{meal.calories} cal</div>
                  <div>P: {meal.macros.protein}g</div>
                  <div>C: {meal.macros.carbs}g</div>
                  <div>F: {meal.macros.fat}g</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

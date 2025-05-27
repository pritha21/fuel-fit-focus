import { NutritionGoals } from "@/components/nutrition-goals"
import { CalorieChart } from "@/components/calorie-chart"

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Nutrition Goals</h1>
          <p className="text-muted-foreground">Track your progress towards daily nutrition targets</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <NutritionGoals />
          <CalorieChart />
        </div>
      </div>
    </div>
  )
}

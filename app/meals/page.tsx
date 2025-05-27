import { MealForm } from "@/components/meal-form"
import { RecentMeals } from "@/components/recent-meals"

export default function MealsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Meals</h1>
          <p className="text-muted-foreground">Log and track your daily meals</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <MealForm />
          </div>
          <div className="lg:col-span-2">
            <RecentMeals />
          </div>
        </div>
      </div>
    </div>
  )
}

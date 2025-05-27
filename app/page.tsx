import { DashboardStats } from "@/components/dashboard-stats"
import { RecentMeals } from "@/components/recent-meals"
import { CalorieChart } from "@/components/calorie-chart"
import { QuickActions } from "@/components/quick-actions"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Diet Tracker</h1>
          <p className="text-muted-foreground">Track your nutrition and reach your health goals</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardStats />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2">
            <CalorieChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <RecentMeals />
      </div>
    </div>
  )
}

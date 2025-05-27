import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Target, TrendingUp, Utensils } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Calories Today",
      value: "1,847",
      target: "/ 2,200",
      icon: Flame,
      color: "text-orange-600",
    },
    {
      title: "Protein",
      value: "89g",
      target: "/ 120g",
      icon: Target,
      color: "text-blue-600",
    },
    {
      title: "Water",
      value: "6",
      target: "/ 8 glasses",
      icon: TrendingUp,
      color: "text-cyan-600",
    },
    {
      title: "Meals",
      value: "3",
      target: "/ 5 planned",
      icon: Utensils,
      color: "text-green-600",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value}
              <span className="text-sm text-muted-foreground font-normal ml-1">{stat.target}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

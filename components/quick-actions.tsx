import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Camera, Search, Target } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Log Meal",
      description: "Add a new meal entry",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Scan Food",
      description: "Use camera to scan barcode",
      icon: Camera,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Search Foods",
      description: "Find nutrition information",
      icon: Search,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Set Goals",
      description: "Update your targets",
      icon: Target,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button key={index} variant="outline" className="w-full justify-start h-auto p-4">
            <div className={`p-2 rounded-md ${action.color} mr-3`}>
              <action.icon className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-sm text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

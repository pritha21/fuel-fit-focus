"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", calories: 2100, target: 2200 },
  { day: "Tue", calories: 1950, target: 2200 },
  { day: "Wed", calories: 2300, target: 2200 },
  { day: "Thu", calories: 2050, target: 2200 },
  { day: "Fri", calories: 1847, target: 2200 },
  { day: "Sat", calories: 2400, target: 2200 },
  { day: "Sun", calories: 1900, target: 2200 },
]

export function CalorieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Calorie Intake</CardTitle>
        <CardDescription>Your daily calories vs target goal</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            calories: {
              label: "Calories",
              color: "hsl(var(--chart-1))",
            },
            target: {
              label: "Target",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="target"
                stackId="1"
                stroke="var(--color-target)"
                fill="var(--color-target)"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="calories"
                stackId="2"
                stroke="var(--color-calories)"
                fill="var(--color-calories)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  name: string
  email: string
  age: number | null
  height: number | null
  weight: number | null
  activity_level: string
  goal: string
  daily_calorie_target: number
  protein_target: number
  carb_target: number
  fat_target: number
  water_target_ml: number
}

export const UserProfileForm: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    age: null,
    height: null,
    weight: null,
    activity_level: "moderately_active",
    goal: "maintain_weight",
    daily_calorie_target: 2000,
    protein_target: 150,
    carb_target: 250,
    fat_target: 65,
    water_target_ml: 2000,
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase.from("users").select("*").eq("user_id", user.id).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
        return
      }

      if (data) {
        setProfile({
          name: data.name || "",
          email: data.email || user.email || "",
          age: data.age,
          height: data.height,
          weight: data.weight,
          activity_level: data.activity_level || "moderately_active",
          goal: data.goal || "maintain_weight",
          daily_calorie_target: data.daily_calorie_target || 2000,
          protein_target: data.protein_target || 150,
          carb_target: data.carb_target || 250,
          fat_target: data.fat_target || 65,
          water_target_ml: data.water_target_ml || 2000,
        })
      } else {
        // No profile exists, set defaults
        setProfile((prev) => ({
          ...prev,
          email: user.email || "",
          name: user.user_metadata?.name || user.email?.split("@")[0] || "",
        }))
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateDefaults = () => {
    if (!profile.weight || !profile.height || !profile.age) {
      toast({
        title: "Missing Information",
        description: "Please enter your age, height, and weight to calculate defaults.",
        variant: "destructive",
      })
      return
    }

    const weight = profile.weight
    const height = profile.height
    const age = profile.age

    // Calculate BMR using Mifflin-St Jeor Equation (assuming female, adjust as needed)
    const bmr = 10 * weight + 6.25 * height - 5 * age - 161

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9,
    }

    const multiplier = activityMultipliers[profile.activity_level as keyof typeof activityMultipliers] || 1.55
    let calories = Math.round(bmr * multiplier)

    // Adjust based on goal
    if (profile.goal === "lose_weight") calories -= 500
    if (profile.goal === "gain_weight") calories += 500

    // Calculate macros
    const protein = Math.round(weight * 2.2) // 2.2g per kg bodyweight
    const fat = Math.round((calories * 0.25) / 9) // 25% of calories from fat
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4) // Rest from carbs

    // Water target (35ml per kg bodyweight)
    const water = Math.round(weight * 35)

    setProfile((prev) => ({
      ...prev,
      daily_calorie_target: calories,
      protein_target: protein,
      carb_target: carbs,
      fat_target: fat,
      water_target_ml: water,
    }))

    toast({
      title: "Defaults Calculated",
      description: "Your nutrition targets have been calculated based on your stats!",
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase.from("users").upsert({
        user_id: user.id,
        name: profile.name,
        email: profile.email,
        age: profile.age,
        height: profile.height,
        weight: profile.weight,
        activity_level: profile.activity_level,
        goal: profile.goal,
        daily_calorie_target: profile.daily_calorie_target,
        protein_target: profile.protein_target,
        carb_target: profile.carb_target,
        fat_target: profile.fat_target,
        water_target_ml: profile.water_target_ml,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error saving profile:", error)
        toast({
          title: "Error",
          description: "Failed to save profile",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Profile saved successfully!",
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and physical stats</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={profile.age || ""}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      age: e.target.value ? Number.parseInt(e.target.value) : null,
                    }))
                  }
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="1"
                  max="300"
                  value={profile.height || ""}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      height: e.target.value ? Number.parseFloat(e.target.value) : null,
                    }))
                  }
                  placeholder="170"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Current Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="1"
                max="500"
                step="0.1"
                value={profile.weight || ""}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    weight: e.target.value ? Number.parseFloat(e.target.value) : null,
                  }))
                }
                placeholder="70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity_level">Activity Level</Label>
              <Select
                value={profile.activity_level}
                onValueChange={(value) => setProfile((prev) => ({ ...prev, activity_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="lightly_active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="extremely_active">Extremely Active (very hard exercise, physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Primary Goal</Label>
              <Select value={profile.goal} onValueChange={(value) => setProfile((prev) => ({ ...prev, goal: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_weight">Lose Weight</SelectItem>
                  <SelectItem value="maintain_weight">Maintain Weight</SelectItem>
                  <SelectItem value="gain_weight">Gain Weight</SelectItem>
                  <SelectItem value="build_muscle">Build Muscle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nutrition Goals</CardTitle>
          <CardDescription>Set your daily nutrition targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Daily Targets</h3>
              <Button
                type="button"
                variant="outline"
                onClick={calculateDefaults}
                disabled={!profile.weight || !profile.height || !profile.age}
              >
                Calculate Defaults
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="daily_calorie_target">Daily Calorie Target</Label>
              <Input
                id="daily_calorie_target"
                type="number"
                min="800"
                max="5000"
                value={profile.daily_calorie_target}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    daily_calorie_target: Number.parseInt(e.target.value) || 2000,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein_target">Protein Target (g)</Label>
              <Input
                id="protein_target"
                type="number"
                min="10"
                max="500"
                value={profile.protein_target}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    protein_target: Number.parseInt(e.target.value) || 150,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carb_target">Carb Target (g)</Label>
              <Input
                id="carb_target"
                type="number"
                min="10"
                max="1000"
                value={profile.carb_target}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    carb_target: Number.parseInt(e.target.value) || 250,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fat_target">Fat Target (g)</Label>
              <Input
                id="fat_target"
                type="number"
                min="10"
                max="300"
                value={profile.fat_target}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    fat_target: Number.parseInt(e.target.value) || 65,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="water_target_ml">Daily Water Target (ml)</Label>
              <Input
                id="water_target_ml"
                type="number"
                min="500"
                max="5000"
                value={profile.water_target_ml}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    water_target_ml: Number.parseInt(e.target.value) || 2000,
                  }))
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={saving} onClick={handleSave}>
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

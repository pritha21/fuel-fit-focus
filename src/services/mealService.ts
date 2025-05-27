import { supabase } from "../supabaseClient"
import type { Food } from "../types/Food"

type MealType = "breakfast" | "lunch" | "dinner" | "snack"

const getTodayDate = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const addFoodToMealInDB = async (userId: string, mealType: MealType, food: Food): Promise<boolean> => {
  try {
    const today = getTodayDate()

    // First, verify the food exists in the database
    const { data: foodData, error: foodError } = await supabase
      .from("food_items")
      .select("food_id")
      .eq("food_id", food.id)
      .single()

    if (foodError) {
      console.error("Food not found in database:", food.id)
      return false
    }

    // Check if meal exists for today
    const { data: existingMeal, error: mealError } = await supabase
      .from("meals")
      .select("meal_id")
      .eq("user_id", userId)
      .eq("date", today)
      .eq("meal_type", mealType)
      .single()

    let mealId

    if (mealError && mealError.code === "PGRST116") {
      // Meal doesn't exist, create it
      const { data: newMeal, error: createError } = await supabase
        .from("meals")
        .insert({
          user_id: userId,
          date: today,
          meal_type: mealType,
        })
        .select("meal_id")
        .single()

      if (createError) throw createError
      mealId = newMeal.meal_id
    } else if (mealError) {
      throw mealError
    } else {
      mealId = existingMeal.meal_id
    }

    // Add meal item
    const { error: itemError } = await supabase.from("meal_items").insert({
      meal_id: mealId,
      food_id: food.id,
      quantity_grams: 100, // Default to 100g
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    })

    if (itemError) throw itemError
    return true
  } catch (error) {
    console.error("Error adding food to meal:", error)
    return false
  }
}

import { supabase } from "@/integrations/supabase/client"
import { getTodayDate } from "@/utils/dateUtils"
import type { Food, MealType } from "@/types/diet"

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

export const fetchTodaysMeals = async (userId: string) => {
  const today = getTodayDate()

  try {
    const { data: meals, error } = await supabase
      .from("meals")
      .select(`
        meal_type,
        meal_items (
          food_id,
          quantity_grams,
          calories,
          protein,
          carbs,
          fat,
          food_items (
            name
          )
        )
      `)
      .eq("user_id", userId)
      .eq("date", today)

    if (error) throw error

    // Transform the data to match our Meals interface
    const mealsData = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    }

    meals?.forEach((meal) => {
      const mealType = meal.meal_type as MealType
      if (meal.meal_items) {
        meal.meal_items.forEach((item) => {
          mealsData[mealType].push({
            id: item.food_id,
            name: item.food_items?.name || "Unknown Food",
            calories: item.calories,
            protein: item.protein || 0,
            carbs: item.carbs || 0,
            fat: item.fat || 0,
            serving: `${item.quantity_grams}g`,
          })
        })
      }
    })

    return mealsData
  } catch (error) {
    console.error("Error fetching meals:", error)
    return {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    }
  }
}

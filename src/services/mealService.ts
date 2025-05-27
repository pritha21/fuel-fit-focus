
import { supabase } from '@/integrations/supabase/client';
import { Food, Meals, MealType } from '@/types/diet';
import { getTodayDate } from '@/utils/dateUtils';

export const fetchTodaysMeals = async (userId: string): Promise<Meals> => {
  const today = getTodayDate();
  console.log('Fetching meals for date:', today, 'user:', userId);

  const { data: mealsData, error } = await supabase
    .from('meals')
    .select(`
      *,
      meal_items (
        *,
        food_items (*)
      )
    `)
    .eq('user_id', userId)
    .eq('date', today);

  if (error) {
    console.error('Error fetching meals:', error);
    return {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: []
    };
  }

  console.log('Fetched meals data:', mealsData);

  // Transform meals data into our format
  const transformedMeals: Meals = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  };

  mealsData?.forEach(meal => {
    const mealType = meal.meal_type as MealType;
    if (transformedMeals[mealType]) {
      meal.meal_items?.forEach((item: any) => {
        const food: Food = {
          id: `${item.food_id}-${item.meal_item_id}`,
          name: item.food_items.name,
          calories: item.calories,
          protein: item.protein || 0,
          carbs: item.carbs || 0,
          fat: item.fat || 0,
          serving: `${item.quantity_grams}g`
        };
        transformedMeals[mealType].push(food);
      });
    }
  });

  return transformedMeals;
};

export const addFoodToMealInDB = async (
  userId: string,
  mealType: MealType,
  food: Food
): Promise<boolean> => {
  try {
    const today = getTodayDate();
    
    // Check if meal exists for today
    let { data: existingMeal, error: mealError } = await supabase
      .from('meals')
      .select('meal_id')
      .eq('user_id', userId)
      .eq('date', today)
      .eq('meal_type', mealType)
      .single();

    let mealId;

    if (mealError && mealError.code === 'PGRST116') {
      // Meal doesn't exist, create it
      const { data: newMeal, error: createError } = await supabase
        .from('meals')
        .insert({
          user_id: userId,
          date: today,
          meal_type: mealType
        })
        .select('meal_id')
        .single();

      if (createError) throw createError;
      mealId = newMeal.meal_id;
    } else if (mealError) {
      throw mealError;
    } else {
      mealId = existingMeal.meal_id;
    }

    // Use the original food.id directly as food_id
    const foodId = food.id;
    console.log('Using food ID:', foodId);

    // Add meal item
    const { error: itemError } = await supabase
      .from('meal_items')
      .insert({
        meal_id: mealId,
        food_id: foodId,
        quantity_grams: 100, // Default to 100g
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
      });

    if (itemError) throw itemError;
    return true;

  } catch (error) {
    console.error('Error adding food to meal:', error);
    return false;
  }
};

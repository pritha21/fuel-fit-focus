
import { supabase } from '@/integrations/supabase/client';
import { Food } from '@/types/diet';

export const fetchFoodItems = async (): Promise<Food[]> => {
  const { data, error } = await supabase
    .from('food_items')
    .select('*');

  if (error) {
    console.error('Error fetching food items:', error);
    return [];
  }

  // Transform Supabase data to match our Food interface
  return data.map(item => ({
    id: item.food_id,
    name: item.name,
    calories: Math.round(item.calories_per_100g),
    protein: Number(item.protein_per_100g) || 0,
    carbs: Number(item.carbs_per_100g) || 0,
    fat: Number(item.fat_per_100g) || 0,
    serving: '100g'
  }));
};

export const searchFoods = (allFoodItems: Food[], query: string): Food[] => {
  if (!query.trim()) {
    return [];
  }
  
  return allFoodItems.filter(food =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );
};

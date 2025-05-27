
export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export interface DailyStats {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  caloriesGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  waterConsumed: number;
  waterGoal: number;
}

export interface WeeklyData {
  day: string;
  calories: number;
}

export interface Meals {
  breakfast: Food[];
  lunch: Food[];
  dinner: Food[];
  snacks: Food[];
}

export type MealType = keyof Meals;

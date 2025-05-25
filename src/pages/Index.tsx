
import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { MealSection } from '../components/MealSection';
import { ProgressCharts } from '../components/ProgressCharts';
import { FoodSearch } from '../components/FoodSearch';
import { useDietTracker } from '../hooks/useDietTracker';

const Index = () => {
  const {
    meals,
    dailyStats,
    weeklyData,
    addFoodToMeal,
    removeFoodFromMeal,
    searchFoods,
    foodSearchResults
  } = useDietTracker();

  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  const handleAddFood = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    setSelectedMealType(mealType);
    setShowFoodSearch(true);
  };

  const handleFoodSelect = (food: any) => {
    addFoodToMeal(selectedMealType, food);
    setShowFoodSearch(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <DashboardHeader dailyStats={dailyStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Meals Section */}
          <div className="lg:col-span-2 space-y-4">
            <MealSection
              title="Breakfast"
              icon="🌅"
              mealType="breakfast"
              foods={meals.breakfast}
              onAddFood={() => handleAddFood('breakfast')}
              onRemoveFood={(food) => removeFoodFromMeal('breakfast', food)}
            />
            <MealSection
              title="Lunch"
              icon="🍽️"
              mealType="lunch"
              foods={meals.lunch}
              onAddFood={() => handleAddFood('lunch')}
              onRemoveFood={(food) => removeFoodFromMeal('lunch', food)}
            />
            <MealSection
              title="Dinner"
              icon="🌙"
              mealType="dinner"
              foods={meals.dinner}
              onAddFood={() => handleAddFood('dinner')}
              onRemoveFood={(food) => removeFoodFromMeal('dinner', food)}
            />
            <MealSection
              title="Snacks"
              icon="🍿"
              mealType="snacks"
              foods={meals.snacks}
              onAddFood={() => handleAddFood('snacks')}
              onRemoveFood={(food) => removeFoodFromMeal('snacks', food)}
            />
          </div>

          {/* Progress Charts */}
          <div className="space-y-4">
            <ProgressCharts dailyStats={dailyStats} weeklyData={weeklyData} />
          </div>
        </div>

        {/* Food Search Modal */}
        {showFoodSearch && (
          <FoodSearch
            onClose={() => setShowFoodSearch(false)}
            onFoodSelect={handleFoodSelect}
            searchFoods={searchFoods}
            searchResults={foodSearchResults}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

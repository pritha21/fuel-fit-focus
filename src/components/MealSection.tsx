
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Food } from '../hooks/useDietTracker';

interface MealSectionProps {
  title: string;
  icon: string;
  mealType: string;
  foods: Food[];
  onAddFood: () => void;
  onRemoveFood: (food: Food) => void;
}

export const MealSection: React.FC<MealSectionProps> = ({
  title,
  icon,
  mealType,
  foods,
  onAddFood,
  onRemoveFood
}) => {
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{totalCalories} calories</p>
          </div>
        </div>
        <button
          onClick={onAddFood}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-full hover:from-green-500 hover:to-blue-600 transition-all duration-200 hover:scale-105 hover-scale"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-2">
        {foods.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No foods added yet</p>
        ) : (
          foods.map((food) => (
            <div key={food.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{food.name}</p>
                <p className="text-sm text-gray-500">{food.serving}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{food.calories} cal</p>
                  <p className="text-xs text-gray-500">
                    P: {Math.round(food.protein)}g | C: {Math.round(food.carbs)}g | F: {Math.round(food.fat)}g
                  </p>
                </div>
                <button
                  onClick={() => onRemoveFood(food)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                >
                  <Minus size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

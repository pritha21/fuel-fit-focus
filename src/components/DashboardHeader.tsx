
import React from 'react';
import { CircularProgress } from './CircularProgress';
import { DailyStats } from '../hooks/useDietTracker';

interface DashboardHeaderProps {
  dailyStats: DailyStats;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ dailyStats }) => {
  const calorieProgress = (dailyStats.calories / dailyStats.caloriesGoal) * 100;
  const proteinProgress = (dailyStats.protein / dailyStats.proteinGoal) * 100;
  const carbsProgress = (dailyStats.carbs / dailyStats.carbsGoal) * 100;
  const fatProgress = (dailyStats.fat / dailyStats.fatGoal) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Diet Tracker
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <CircularProgress 
            value={calorieProgress} 
            size={80}
            strokeWidth={6}
            color="from-green-400 to-blue-500"
          >
            <div className="text-center">
              <div className="text-lg font-bold">{Math.round(dailyStats.calories)}</div>
              <div className="text-xs text-gray-500">of {dailyStats.caloriesGoal}</div>
            </div>
          </CircularProgress>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 font-medium">Calories</p>
              <p className="text-2xl font-bold text-red-700">{Math.round(dailyStats.calories)}</p>
              <p className="text-sm text-red-500">of {dailyStats.caloriesGoal}</p>
            </div>
            <div className="text-red-400 text-2xl">🔥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium">Protein</p>
              <p className="text-2xl font-bold text-blue-700">{Math.round(dailyStats.protein)}g</p>
              <p className="text-sm text-blue-500">of {dailyStats.proteinGoal}g</p>
            </div>
            <div className="text-blue-400 text-2xl">💪</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 font-medium">Carbs</p>
              <p className="text-2xl font-bold text-yellow-700">{Math.round(dailyStats.carbs)}g</p>
              <p className="text-sm text-yellow-500">of {dailyStats.carbsGoal}g</p>
            </div>
            <div className="text-yellow-400 text-2xl">🌾</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium">Fat</p>
              <p className="text-2xl font-bold text-purple-700">{Math.round(dailyStats.fat)}g</p>
              <p className="text-sm text-purple-500">of {dailyStats.fatGoal}g</p>
            </div>
            <div className="text-purple-400 text-2xl">🥑</div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DailyStats, WeeklyData } from '../hooks/useDietTracker';

interface ProgressChartsProps {
  dailyStats: DailyStats;
  weeklyData: WeeklyData[];
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({ dailyStats, weeklyData }) => {
  const macroData = [
    { name: 'Protein', value: dailyStats.protein, color: '#3B82F6' },
    { name: 'Carbs', value: dailyStats.carbs, color: '#F59E0B' },
    { name: 'Fat', value: dailyStats.fat, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      {/* Weekly Calories Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Calories</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Bar dataKey="calories" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Macro Distribution */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Macros</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {macroData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {macroData.map((macro) => (
            <div key={macro.name} className="text-center">
              <div 
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ backgroundColor: macro.color }}
              ></div>
              <p className="text-xs font-medium text-gray-600">{macro.name}</p>
              <p className="text-sm font-bold">{Math.round(macro.value)}g</p>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Goals</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Calories</span>
              <span>{Math.round(dailyStats.calories)}/{dailyStats.caloriesGoal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((dailyStats.calories / dailyStats.caloriesGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Protein</span>
              <span>{Math.round(dailyStats.protein)}g/{dailyStats.proteinGoal}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((dailyStats.protein / dailyStats.proteinGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Carbs</span>
              <span>{Math.round(dailyStats.carbs)}g/{dailyStats.carbsGoal}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((dailyStats.carbs / dailyStats.carbsGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Fat</span>
              <span>{Math.round(dailyStats.fat)}g/{dailyStats.fatGoal}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((dailyStats.fat / dailyStats.fatGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

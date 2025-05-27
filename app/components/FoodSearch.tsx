"use client"

import type React from "react"
import { useState } from "react"
import { Search, Plus, X } from "lucide-react"

interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
}

interface FoodSearchProps {
  onClose: () => void
  onFoodSelect: (food: Food) => void
  searchFoods: (query: string) => void
  searchResults: Food[]
}

export const FoodSearch: React.FC<FoodSearchProps> = ({ onClose, onFoodSelect, searchFoods, searchResults }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    searchFoods(query)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden animate-scale-in">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add Food</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-96">
          {searchResults.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {searchQuery ? "No foods found" : "Start typing to search for foods"}
            </p>
          ) : (
            <div className="space-y-2">
              {searchResults.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onFoodSelect(food)}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{food.name}</p>
                    <p className="text-sm text-gray-500">{food.serving}</p>
                    <p className="text-xs text-gray-400">
                      {food.calories} cal | P: {Math.round(food.protein)}g | C: {Math.round(food.carbs)}g | F:{" "}
                      {Math.round(food.fat)}g
                    </p>
                  </div>
                  <button className="text-green-500 hover:text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors">
                    <Plus size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

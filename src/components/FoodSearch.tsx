"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Search } from "lucide-react"

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Search Foods</CardTitle>
          <Button onClick={onClose} size="sm" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for foods..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {searchResults.length === 0 && searchQuery ? (
              <p className="text-center text-gray-500 py-8">No foods found</p>
            ) : searchResults.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Start typing to search for foods</p>
            ) : (
              searchResults.map((food) => (
                <div
                  key={food.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => onFoodSelect(food)}
                >
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-gray-600">
                    {food.serving} • {food.calories} cal • P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

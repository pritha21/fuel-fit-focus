import { useState, useEffect } from 'react';
import { Food } from '@/types/diet';
import { fetchFoodItems, searchFoods } from '@/services/foodService';

export const useFoodSearch = () => {
  const [foodSearchResults, setFoodSearchResults] = useState<Food[]>([]);
  const [allFoodItems, setAllFoodItems] = useState<Food[]>([]);

  useEffect(() => {
    fetchFoodItems().then(setAllFoodItems);
  }, []);

  const performSearch = (query: string) => {
    const results = searchFoods(allFoodItems, query);
    setFoodSearchResults(results);
  };

  const refreshFoodItems = () => {
    fetchFoodItems().then(setAllFoodItems);
  };

  return {
    foodSearchResults,
    performSearch,
    refreshFoodItems
  };
};

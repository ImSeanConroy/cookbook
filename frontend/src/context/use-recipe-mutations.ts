"use client";

import { useState } from "react";
import axios from "axios";
import { config } from "@/config";
import { useRecipes } from "@/context/recipe-context";

export type RecipeMutationInput = {
  title: string;
  subtitle: string;
  description: string;
  cook_time: number;
  servings: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  mealTypes: string[];
  dietaryPreferences: string[];
  cuisine: string;
  image_url: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugars: number;
  saturated_fat: number;
  sodium: number;
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  steps: string[];
};

type RecipeMutationPayload = {
  title: string;
  subtitle: string;
  description: string;
  meta: {
    cookTime: number;
    servings: number;
    difficulty: "beginner" | "intermediate" | "advanced";
    mealTypes: string[];
    dietaryPreferences: string[];
    cuisine: string;
  };
  media: {
    imageUrl: string;
  };
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugars: number;
    saturatedFat: number;
    sodium: number;
  };
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: string;
    optional?: boolean;
  }>;
  steps: string[];
};

const apiClient = axios.create({
  baseURL: `${config.BASE_URL}/api`,
  withCredentials: true,
});

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
};

const toRecipePayload = (payload: RecipeMutationInput): RecipeMutationPayload => ({
  title: payload.title,
  subtitle: payload.subtitle,
  description: payload.description,
  meta: {
    cookTime: payload.cook_time,
    servings: payload.servings,
    difficulty: payload.difficulty,
    mealTypes: payload.mealTypes,
    dietaryPreferences: payload.dietaryPreferences,
    cuisine: payload.cuisine,
  },
  media: {
    imageUrl: payload.image_url,
  },
  nutrition: {
    calories: payload.calories,
    protein: payload.protein,
    carbs: payload.carbs,
    fat: payload.fat,
    fiber: payload.fiber,
    sugars: payload.sugars,
    saturatedFat: payload.saturated_fat,
    sodium: payload.sodium,
  },
  ingredients: payload.ingredients,
  steps: payload.steps,
});

export const useRecipeMutations = () => {
  const { refreshRecipes } = useRecipes();
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRecipe = async (payload: RecipeMutationInput) => {
    setIsMutating(true);
    setError(null);

    try {
      await apiClient.post("/recipe", toRecipePayload(payload));
      await refreshRecipes();
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Failed to create recipe");
      setError(message);
      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const updateRecipe = async (recipeId: string, payload: RecipeMutationInput) => {
    setIsMutating(true);
    setError(null);

    try {
      await apiClient.put(`/recipe/${recipeId}`, toRecipePayload(payload));
      await refreshRecipes();
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Failed to update recipe");
      setError(message);
      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    setIsMutating(true);
    setError(null);

    try {
      await apiClient.delete(`/recipe/${recipeId}`);
      await refreshRecipes();
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Failed to delete recipe");
      setError(message);
      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  return {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    isMutating,
    error,
  };
};

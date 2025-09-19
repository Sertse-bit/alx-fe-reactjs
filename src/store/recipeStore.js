import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [],

  // Action to add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // Action to set all recipes (e.g., from API)
  setRecipes: (recipes) => set({ recipes }),
}))

export default useRecipeStore

import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  recommendations: [],

  addFavorite: (id) =>
    set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== id),
    })),
  generateRecommendations: () =>
    set((state) => {
      const recs = state.recipes.filter(
        (r) => state.favorites.includes(r.id) && Math.random() > 0.5
      );
      return { recommendations: recs };
    }),

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? updated : r)),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),
}));

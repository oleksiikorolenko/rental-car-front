import { create } from "zustand";
import { persist } from "zustand/middleware";


type FavoritesState = {
    favorites: string[];
}

type FavoritesActions = {
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create(
    persist<FavoritesState & FavoritesActions>((set, get) => ({
        favorites: [],
        toggleFavorite: (id) => {
            const { favorites } = get();
            const exists = favorites.includes(id);

            set({
                favorites: exists
                    ? favorites.filter((item) => item !== id)
                    : [...favorites, id]
            });
        },
        isFavorite: (id) => get().favorites.includes(id),
    }),
        {
            name: "favorites-storage",
            skipHydration: true,
        }
    )
);
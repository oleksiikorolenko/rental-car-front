import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Filters, Car } from "../../types/car";

type CatalogState = {
  filters: Filters;
  cars: Car[];
  favoritesCars: string[];

  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;

  setCars: (cars: Car[]) => void;
  resetCars: () => void;

  toggleFavorite: (id: string) => void;
};

const initialFilters: Filters = {
  brand: undefined,
  rentalPrice: undefined,
  mileageFrom: undefined,
  mileageTo: undefined,
};

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      filters: initialFilters,
      cars: [],
      favoritesCars: [],

      // фільтри 
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      // скидання усіх фільтрів
      resetFilters: () =>
        set(() => ({
          filters: initialFilters,
          cars: [],
        })),

      // список авто
      setCars: (cars) => set({ cars }),
      resetCars: () => set({ cars: [] }),

      // улюблені
      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favoritesCars.includes(id);
          return {
            favoritesCars: exists
              ? state.favoritesCars.filter((x) => x !== id)
              : [...state.favoritesCars, id],
          };
        }),
    }),
    {
      name: "catalog-store",
      partialize: (state) => ({
        favoritesCars: state.favoritesCars,
      }),
    }
  )
);


// import { Car } from "@/types/car";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type Filters = {
//     brand?: string | null;
//     rentalPrice?: string | null;
//     mileageFrom?: number | null;
//     mileageTo?: number | null;
// }

// type AppState = {
// favorites: Record<string, Car>;
// filters: Filters;
// setFilters: (f: Filters) => void;
// addFavorite: (car: Car) => void;
// removeFavorite: (id: string) => void;
// clearFavorites: () => void;

// //     setBrand: (brand: string | null) => void;
// //     setPrice: (price: number | null) => void;
// //     setMilageFrom: (milageFrom: number | null) => void;
// //    setMilageTo: ( milageTo: number | null) => void; 
// }
 
// // const initialState: FiltersState = {
// //      brand: null,
// //     price: null,
// //     milageFrom: null,
// //     milageTo: null,
// // }

// export const useStore = create<AppState>()(
//     persist(
//         set => ({
//            favorites: {},
//            filters: {},
//            setFilters: f => set (state => ({filters: {...state.filters, ...f}})),
//            addFavorite: car => set (state => ({favorites: {...state.favorites, [car.id]: car}})),
//            removeFavorite: id => set(state => {
//             const copy = {...state.favorites};
//             delete copy[id];
//             return {favorites: copy};
//            }),
//            clearFavorites: ()=> set({favorites: {}}),
//         }),
//         {
//             name: "retalcar-storage",
//         }
//     )
// );
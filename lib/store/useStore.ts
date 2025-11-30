import { Car } from "@/types/car";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Filters = {
    brand?: string | null;
    rentalPrice?: string | null;
    mileageFrom?: number | null;
    mileageTo?: number | null;
}

type AppState = {
favorites: Record<string, Car>;
filters: Filters;
setFilters: (f: Filters) => void;
addFavorite: (car: Car) => void;
removeFavorite: (id: string) => void;
clearFavorites: () => void;

//     setBrand: (brand: string | null) => void;
//     setPrice: (price: number | null) => void;
//     setMilageFrom: (milageFrom: number | null) => void;
//    setMilageTo: ( milageTo: number | null) => void; 
}
 
// const initialState: FiltersState = {
//      brand: null,
//     price: null,
//     milageFrom: null,
//     milageTo: null,
// }

export const useStore = create<AppState>()(
    persist(
        set => ({
           favorites: {},
           filters: {},
           setFilters: f => set (state => ({filters: {...state.filters, ...f}})),
           addFavorite: car => set (state => ({favorites: {...state.favorites, [car.id]: car}})),
           removeFavorite: id => set(state => {
            const copy = {...state.favorites};
            delete copy[id];
            return {favorites: copy};
           }),
           clearFavorites: ()=> set({favorites: {}}),
        }),
        {
            name: "retalcar-storage",
        }
    )
);
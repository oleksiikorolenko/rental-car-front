import { create } from "zustand";

export type FiltersState = {
    brand: string | null;
    price: number | null;
    milageFrom: number | null;
    milageTo: number | null;
}

type FiltersActions = {
    setBrand: (brand: string | null) => void;
    setPrice: (price: number | null) => void;
    setMilageFrom: (milageFrom: number | null) => void;
   setMilageTo: ( milageTo: number | null) => void; 
}
 
const initialState: FiltersState = {
     brand: null,
    price: null,
    milageFrom: null,
    milageTo: null,
}

export const useFiltersStore = create<FiltersState & FiltersActions>((set) => ({
    ...initialState,
    setBrand: (brand) => set({ brand }),
    setPrice: (price) => set({ price }),
    setMilageFrom: (milageFrom) => set({ milageFrom }),
    setMilageTo: (milageTo) => set({ milageTo }),
    
    resetFilters: () => set({ ...initialState })
}));
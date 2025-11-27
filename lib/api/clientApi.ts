import { api } from "./api";
import { CarDetails, CarFetchParams, FetchCarsResponse } from "@/types/car";

export async function fetchCars(params: CarFetchParams = {}): Promise<FetchCarsResponse> {
    const{page = 1, perPage = 12, brand, price, milageFrom, milageTo} = params
    const query: Record<string, string | number> = {
        page,
        perPage,
    }

    if (brand) query.brand = brand;
    if (price !== undefined) query.price = price;
    if (milageFrom !== undefined) query.milageFrom = milageFrom;
    if (milageTo !== undefined) query.milageTo = milageTo;
    const response = await api.get<FetchCarsResponse>("/cars", { params: query });
    return response.data;
};

export async function fatchCarById(id: string): Promise<CarDetails> {
    const response = await api.get<CarDetails>(`/cars/${id}`);
    return response.data;
}

export async function fatchBrand(): Promise<string[]>{
    const response = await api.get<string[]>("/brands");
    return response.data;
}
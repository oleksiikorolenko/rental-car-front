import { api } from "./api";
import { CarDetails, CarFetchParams, FetchCarsResponse } from "@/types/car";

export async function fetchCars(params: CarFetchParams = {}): Promise<FetchCarsResponse> {
    const{page = 1, perPage = 12, brand, price, mileageFrom, mileageTo} = params
    const query: Record<string, string | number> = {
        page,
        perPage,
    }

    if (brand) query.brand = brand;
    if (price !== undefined) query.price = price;
    if (mileageFrom !== undefined) query.mileageFrom = mileageFrom;
    if (mileageTo !== undefined) query.milageTo = mileageTo;
    const response = await api.get<FetchCarsResponse>("/cars", { params: query });
    console.log(response);
    return response.data;
};



export async function fetchCarById(id: string): Promise<CarDetails> {
    const response = await api.get<CarDetails>(`/cars/${id}`);
    return response.data;
}

export async function fetchBrand(): Promise<string[]>{
    const response = await api.get<string[]>("/brands");
    console.log(response);
    return response.data;
}

fetchBrand();
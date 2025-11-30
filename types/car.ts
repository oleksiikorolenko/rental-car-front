export type Car = {
     
      id: string,
    year: number;
    brand: string;
    model: string;
      type: string;
      img: string;
      description: string;
    fuelConsumption: number;
      engineSize: string;
    accessories: string[];
    functionalities: string[];
      rentalPrice: string,
      rentalCompany: string;
      address: string;
    rentalConditions: string[];
    mileage: number;
}


export type FetchCarsResponse = {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
}

export type CarDetails = Car;

export type CarFetchParams = {
    page?: number;
    perPage?: number;
    brand?: string;
    rentalPrice?: number;
    mileageFrom?: number;
    mileageTo?: number;
}


export type Filters = {
  brand?: string;
  rentalPrice?: number;
  mileageFrom?: number;
  mileageTo?: number;
};

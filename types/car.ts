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
    accessories: Accessories;
    functionalities: Functionalities;
      rentalPrice: number,
      rentalCompany: string;
      address: string;
    rentalConditions: RentalConditions;
    mileage: 5858;
}
    
export type Accessories = string[];
export type Functionalities = string[];
export type RentalConditions = string[];

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
    price?: number;
    mileageFrom?: number;
    mileageTo?: number;
}

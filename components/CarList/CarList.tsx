"use client";

import type { Car } from "@/types/car";
import CarItem from "../CarCard/CarCard";
import css from "./CarList.module.css";

type CarsListProps = {
  cars: Car[];
  favoritesCars: string[];
  onToggleFavorite: (id: string) => void;
  noCarsFound: boolean;
};

export default function CarsList({
  cars,
  favoritesCars,
  onToggleFavorite,
  noCarsFound,
}: CarsListProps) {

  return (
    <>
      {noCarsFound && <p className={css.noCarsFound}>No cars found.</p>}

      <ul className={css.list}>
        {cars.map((car) => {
          const isFavorite = favoritesCars.includes(car.id);
          return (
            <CarItem
              key={car.id}
              car={car}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          );
        })}
      </ul>
    </>
  );
}



"use client";

import Link from "next/link";
import type { Car } from "@/types/car";
import css from "./CarCard.module.css";
import Image from "next/image";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

type CarCardProps = {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function CarItem({
  car,
  isFavorite,
  onToggleFavorite,
}: CarCardProps) {
  const formatLocation = (address: string) => {
    const parts = address.split(",").map((part) => part.trim());
    const city = parts[1] || "";
    const country = parts[2] || "";
    return `${city} | ${country} | ${car.rentalCompany} |`;
  };

  return (
    <li className={css.item}>
      <div className={css.imgWrapper}>
        <Image
          className={css.image}
          src={car.img}
          alt={car.description}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
        />

        <button
          type="button"
          className={`${css.favoritesBtn} ${
            isFavorite ? css.favoritesBtnActive : ""
          }`}
          onClick={() => onToggleFavorite(car.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${car.brand} ${car.model} from favorites`
              : `Add ${car.brand} ${car.model} to favorites`
          }
        >
          {isFavorite ? (
            <IoMdHeart className={css.iconFavoritesActive} size={16}/>
          ) : (
            <IoMdHeartEmpty className={css.iconFavorites} size={16}/>
          )}
        </button>
      </div>

      <div className={css.info}>
        <h3 className={css.title}>
          {car.brand} <span className={css.carModel}>{car.model}</span>,
          <span className={css.carYear}>{car.year}</span>
          <span className={css.carPrice}>${car.rentalPrice}</span>
        </h3>
        <div className={css.details}>
          <span className={css.location}>{formatLocation(car.address)}</span>
          <span className={css.typeMileage}>
            {car.type} | {car.mileage?.toLocaleString()} km
          </span>
        </div>
      </div>

      <Link
        href={`/cars/${car.id}`}
        className={css.readMoreLink}
        aria-label={`View details about ${car.brand} ${car.model}`}
      >
        Read more
      </Link>
    </li>
  );
}


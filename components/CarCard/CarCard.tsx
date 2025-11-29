"use client";
import React from "react";
import Link from "next/link";
import { Car } from "../../types/car";
import styles from "./CarCard.module.css";
import { formatMileage } from "../../lib/utils/format";
import { useStore } from "../../lib/store/useStore";

type Props = { car: Car };

const CarCard: React.FC<Props> = ({ car }) => {
  const add = useStore((s) => s.addFavorite);
  const remove = useStore((s) => s.removeFavorite);
  const favorites = useStore((s) => s.favorites);
  const isFav = Boolean(favorites[car.id]);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={car.img} alt={`${car.brand} ${car.model}`} className={styles.image} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{car.brand} {car.model}, {car.year}</h3>
        <div className={styles.sub}>{formatMileage(car.mileage)}</div>
        <div className={styles.row}>
          <Link href={`/catalog/${car.id}`}>
            <button className={styles.read}>Read more</button>
          </Link>
          <div className={styles.right}>
            <button
              className={styles.fav}
              onClick={() => (isFav ? remove(car.id) : add(car))}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              {isFav ? "💙" : "🤍"}
            </button>
            <div className={styles.price}>${car.rentalPrice}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
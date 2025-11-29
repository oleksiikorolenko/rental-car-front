// src/components/CarGrid/CarGrid.tsx
import React from "react";
import { Car } from "../../types/car";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";

type Props = { cars: Car[] };

const CarList: React.FC<Props> = ({ cars }) => {
  if (!cars.length) {
    return <div className={styles.empty}>No cars found</div>;
  }
  return (
    <div className={styles.grid}>
      {cars.map((c) => (
        <CarCard key={c.id} car={c} />
      ))}
    </div>
  );
};

export default CarList;
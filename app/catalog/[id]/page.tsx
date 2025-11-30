"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCarById, createBooking } from "../../../lib/api/clientApi";
import Loader from "../../../components/Loader/Loader";
import BookingForm from "../../../components/BookingForm/BookingForm";
import { formatMileage } from "../../../lib/utils/format";
import styles from "./page.module.css";
import Image from "next/image";
import { PayloadProps } from "@/types/car";

export default function CarDetailsPage() {
  const params = useParams() as { id: string };
  const id = params.id;

  const { data: car, isLoading } = useQuery(
    {queryKey: ["car", id],
    queryFn: () => fetchCarById(id), 
    enabled: !!id });

  const mutation = useMutation({
    mutationFn:(payload: PayloadProps) => createBooking(id, payload),
    onSuccess: () => alert("Booking successful"),
    onError: () => alert("Booking failed"),
    });

  if (isLoading) return <Loader />;
  if (!car) return <div style={{ padding: 24 }}>Car not found</div>;

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <Image src={car.img} alt={`${car.brand} ${car.model}`} className={styles.image} width={640} height={512}/>
        <h2 className={styles.title}>{car.brand} {car.model}, {car.year}</h2>
        <p>{car.description}</p>

        <ul className={styles.props}>
          <li><strong>Fuel consumption:</strong> {car.fuelConsumption} L</li>
          <li><strong>Engine size:</strong> {car.engineSize}</li>
          <li><strong>Mileage:</strong> {formatMileage(car.mileage)}</li>
        </ul>
      </div>

      <aside className={styles.right}>
        <div className={styles.box}>
          <h3>Book your car now</h3>
          <BookingForm onSubmit={(vals) => mutation.mutate(vals)} loading={mutation.isPending} />
        </div>
      </aside>
    </div>
  );
}
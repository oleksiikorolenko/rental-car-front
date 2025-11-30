"use client";
import { CiLocationOn } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from "@/lib/api/clientApi";
import type { Car } from "@/types/car";
import Image from "next/image";
import css from "./CarDetails.module.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsCalendar2Week } from "react-icons/bs";
import { IoIosCar } from "react-icons/io";
import { BsEvStation } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import BookingForm from "../BookingForm/BookingForm";

type CarDetailsProps = {
  id: string;
};

export default function CarDetails({ id }: CarDetailsProps) {
  const {
    data: car,
    isLoading,
    isError,
    error,
  } = useQuery<Car>({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
  });

  const indexId = car?.id?.slice(0, 4) ?? "";

  if (isLoading && !car) return <p className={css.loadText}>…</p>;
  if (isError)
    return (
      <p style={{ color: "red" }}>
        Сталася помилка: {(error as Error)?.message}
      </p>
    );
  if (!car) return <p>Авто не знайдено.</p>;
  const conditions = car.rentalConditions;
  const features = [...car.accessories, ...car.functionalities];
  const formatLocation = (address: string) => {
    const parts = address.split(",").map((part) => part.trim());
    const city = parts[1] || "";
    const country = parts[2] || "";
    return `${city}, ${country}`;
  };

  return (
    <section className={css.car}>
      <div className={css.container}>
        <div className={css.imageAndForm}>
          <Image
            className={css.image}
            src={car.img}
            alt={car.description}
            width={640}
            height={512}
          />
          <BookingForm/>
        </div>
        <div className={css.descriptions}>
          <div className={css.globalInfo}>
            <div className={css.name}>
              <h3 className={css.title}>
                {car.brand} <span className={css.carModel}>{car.model}</span>,
                <span className={css.carYear}>{car.year}</span>
                <span className={css.carId}>id: {indexId}</span>
              </h3>
              <div className={css.address}>
                <p className={css.textLocation}>
                  <span className={css.location}>
                    <CiLocationOn />
                  </span>
                  {formatLocation(car.address)}{" "}
                  <span className={css.mileage}>{car.mileage} km</span>
                </p>
                <p className={css.price}>${car.rentalPrice}</p>
                <p>{car.description}</p>
              </div>
            </div>

            <div className={css.allInfo}>
              <div className={css.rentalConditions}>
                <p className={css.rentalTitle}>Rental Conditions:</p>
                <div className={css.rentalTitleText}>
                  {conditions.map((condition, index) => (
                    <p key={index} className={css.rentalConditionItem}>
                      <AiOutlineCheckCircle size={18} />
                      {condition}
                    </p>
                  ))}
                </div>
              </div>

              <div className={css.carSpecifications}>
                <p className={css.carSpecificationsTitle}>
                  Car Specifications:
                </p>
                <div className={css.rentalTitleText}>
                  <p className={css.rentalTitleTextAdd}>
                    <BsCalendar2Week />
                    Year: {car.year}
                  </p>
                  <p className={css.rentalTitleTextAdd}>
                    <IoIosCar />
                    Type: {car.type}
                  </p>
                  <p className={css.rentalTitleTextAdd}>
                    <BsEvStation />
                    Fuel Consumption: {car.fuelConsumption}
                  </p>
                  <p className={css.rentalTitleTextAdd}>
                    <IoSettingsOutline />
                    Engine Size: {car.engineSize}
                  </p>
                </div>
              </div>

              <div className={css.accessoriesAndfunctionalities}>
                <p className={css.accessoriesAndfunctionalitiesTitle}>
                  Accessories and functionalities:
                </p>
                <div className={css.accessoriesAndfunctionalitiesText}>
                  {features.map((feature, index) => (
                    <p key={index} className={css.featureItem}>
                      <AiOutlineCheckCircle size={18} />
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
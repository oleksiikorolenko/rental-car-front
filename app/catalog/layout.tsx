import type { ReactNode } from "react";
import type { Metadata } from "next";
import css from "./catalog.module.css";

export const metadata: Metadata = {
  title: "CarRent: catalog",
  description:
    "Browse the CarRent catalog and find the perfect car for your trip. Filter by brand, price and mileage, view details and send a booking request online.",
  openGraph: {
    title: "CarRent: catalog",
    description:
      "Browse the CarRent catalog and find the perfect car for your trip. Filter by brand, price and mileage, view details and send a booking request online.",
    url: "https://rent-cars-app-evl6.vercel.app/catalog",
    siteName: "CarRent",
    type: "website",
    images: [
      {
        url: "/og-car.png",
        width: 1200,
        height: 630,
        alt: "CarRent – car catalog",
      },
    ],
  },
};

type CatalogLayoutProps = {
  children: ReactNode;
  filters: ReactNode;
};

export default function CatalogLayout({ children, filters }: CatalogLayoutProps) {
  return (
    <section className={css.catalog}>
      <div>{filters}</div>
      <div className="flex-1">{children}</div>
    </section>
  );
}
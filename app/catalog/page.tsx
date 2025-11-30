"use client";
import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCars } from "../../lib/api/clientApi";
import { useStore } from "../../lib/store/useStore";
import Loader from "../../components/Loader/Loader";
import CarList from "../../components/CarList/CarList";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";

export default function CatalogPage() {
  const filters = useStore(s => s.filters);
  const [page, setPage] = React.useState(1);
  const [perPage] = React.useState(12);

  // Important: when filters change, reset page to 1 and clear previous results
  React.useEffect(() => {
    setPage(1);
  }, [filters.brand, filters.rentalPrice, filters.mileageFrom, filters.mileageTo]);

  const queryKey = ["cars", { ...filters, page, perPage }];
 const { data, isLoading, isFetching, refetch } = useQuery({
  queryKey,
  queryFn: () =>
    fetchCars({
      brand: filters.brand || undefined,
      rentalPrice: filters.rentalPrice || undefined,
      mileageFrom: filters.mileageFrom ?? undefined,
      mileageTo: filters.mileageTo ?? undefined,
      page,
      perPage,
    }),
  placeholderData: keepPreviousData,
});

  const cars = data?.cars ?? [];

  return (
    <div>
      <h1 style={{ padding: 16 }}>Catalog</h1>
      <FiltersPanel />
      {isLoading ? <Loader /> : <CarList cars={cars} />}
      <div style={{ textAlign: "center", padding: 24 }}>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={isFetching || (data && data.page >= data.totalPages)}
          style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}
        >
          {isFetching ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import type { Filters, FetchCarsResponse } from "@/types/car";
import { useCatalogStore } from "@/lib/store/catalogStore";
import { useInfinite } from "@/lib/hooks/useInfinite";
import CarsList from "../CarList/CarList";
import LoadMore from "../LoadMore/LoadMore";
import css from "./CatalogClient.module.css"
import CarsSkeleton from "../CarTemplate/CarTemplate";


type CatalogClientProps = {
  initialFilters: Filters;
  initialPage?: FetchCarsResponse;
};

export default function CatalogClient({
  initialFilters,
  initialPage,
}: CatalogClientProps) {
  const cars = useCatalogStore((state) => state.cars);
  const favoritesCars = useCatalogStore((state) => state.favoritesCars);
  const setFilters = useCatalogStore((state) => state.setFilters);
  const toggleFavorite = useCatalogStore((state) => state.toggleFavorite);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters, setFilters]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfinite(initialPage, initialFilters);

  if (isError) {
    return (
      <p style={{ color: "red" }}>
        Сталася помилка: {(error as Error)?.message}
      </p>
    );
  }

if ((isLoading || isFetching) && cars.length === 0) {
  return (
    <section className={css.catalogClient}>
      <div className={css.container}>
        <CarsSkeleton cards={4} />
      </div>
    </section>
  );
}

  const noCarsFound =
    !isLoading && data && data.pages.every((page) => page.cars.length === 0);

  return (
    <section className={css.catalogClient}>
      <div className={css.container}>
      <CarsList
        cars={cars}
        favoritesCars={favoritesCars}
        onToggleFavorite={toggleFavorite}
        noCarsFound={noCarsFound}
      />

      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        hasCars={cars.length > 0}
        onFetchNextPage={fetchNextPage}
      />
      </div>
    </section>
  );
}
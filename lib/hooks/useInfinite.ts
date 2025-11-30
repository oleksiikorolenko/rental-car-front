import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/clientApi";
import { useCatalogStore } from "../store/catalogStore";
import { FetchCarsResponse, Filters } from "@/types/car";
import { useEffect } from "react";

export function useInfinite(
  initialPage?: FetchCarsResponse,
  initialFilters?: Filters
) {
  const { filters, setCars } = useCatalogStore();
  const { brand, rentalPrice, mileageFrom, mileageTo } = filters;

  const isInitialFilters =
    initialFilters &&
    initialFilters.brand === brand &&
    initialFilters.rentalPrice === rentalPrice &&
    initialFilters.mileageFrom === mileageFrom &&
    initialFilters.mileageTo === mileageTo;

  const query = useInfiniteQuery<FetchCarsResponse>({
    queryKey: ["cars", { brand, rentalPrice, mileageFrom, mileageTo }],
    queryFn: ({ pageParam = 1 }) =>
      fetchCars({
        brand,
        rentalPrice,
        mileageFrom,
        mileageTo,
        page: pageParam as number,
        perPage: 12,
      }),
    initialPageParam: 1,
    initialData:
      isInitialFilters && initialPage
        ? {
            pages: [initialPage],
            pageParams: [1],
          }
        : undefined,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const currentPage = (lastPageParam as number) ?? 1;
      if (currentPage >= lastPage.totalPages) return undefined;
      return currentPage + 1;
    },
  });

  useEffect(() => {
    if (!query.data) return;
    const allCars = query.data.pages.flatMap((page) => page.cars);
    setCars(allCars);
  }, [query.data, setCars]);

  return query;
}
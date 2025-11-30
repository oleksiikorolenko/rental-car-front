import { fetchCars } from "@/lib/api/clientApi";
import CatalogClient from "@/components/CatalogClient/CatalogClient";
export const dynamic = "force-dynamic";


type CatalogSearchParams = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: string;
};

type CatalogProps = {
  searchParams: Promise<CatalogSearchParams>;
};
export default async function Catalog({ searchParams }: CatalogProps) {
  const { brand, rentalPrice, minMileage, maxMileage, page} = await searchParams;

  const filters = {
    brand: brand || undefined,
    rentalPrice: rentalPrice ? Number(rentalPrice) : undefined,
    minMileage: minMileage ? Number(minMileage) : undefined,
    maxMileage: maxMileage ? Number(maxMileage) : undefined,
  };

  const currentPage = page ? Number(page) : 1;

  const firstPage = await fetchCars({
    ...filters,
    page: currentPage,
    perPage: 12,
  });


  return (
    <>
      <CatalogClient
        initialFilters={filters}
        initialPage={firstPage}
      />
    </>
  );
}

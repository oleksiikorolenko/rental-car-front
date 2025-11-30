import { fetchBrand } from "@/lib/api/clientApi";
import FiltersPanel from "@/components/FiltersPanel/FiltersPanel";

export default async function CatalogFiltersPage() {
  const brands = await fetchBrand();

  return <FiltersPanel brandsOptions={brands} />;
}
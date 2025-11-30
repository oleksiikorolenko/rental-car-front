"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
import css from "./FiltersPanel.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tools/select";
import { Button } from "@/components/tools/button";


import { useCatalogStore } from "@/lib/store/catalogStore";

type FiltersPanelProps = {
  brandsOptions: string[];
};

const priceOptions = ["30", "40", "50", "60", "70", "80"];

export default function FiltersPanel({ brandsOptions }: FiltersPanelProps) {
  const filters = useCatalogStore((state) => state.filters);
  const setFilters = useCatalogStore((state) => state.setFilters);
  const resetCars = useCatalogStore((state) => state.resetCars);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();


  const carsFetchingCount = useIsFetching({ queryKey: ["cars"] });
  const isRefreshing = carsFetchingCount > 0;

  const [brand, setBrand] = React.useState<string>(filters.brand ?? "");
  const [price, setPrice] = React.useState<string | undefined>(
    filters.rentalPrice !== undefined ? String(filters.rentalPrice) : undefined
  );
  const [mileageFrom, setMileageFrom] = React.useState<string>(
    filters.mileageFrom !== undefined ? String(filters.mileageFrom) : ""
  );
  const [mileageTo, setMileageTo] = React.useState<string>(
    filters.mileageTo !== undefined ? String(filters.mileageTo) : ""
  );

  React.useEffect(() => {
    setBrand(filters.brand ?? "");
    setPrice(
      filters.rentalPrice !== undefined
        ? String(filters.rentalPrice)
        : undefined
    );
    setMileageFrom(
      filters.mileageFrom !== undefined ? String(filters.mileageFrom) : ""
    );
    setMileageTo(
      filters.mileageTo !== undefined ? String(filters.mileageTo) : ""
    );
  }, [
    filters.brand,
    filters.rentalPrice,
    filters.mileageFrom,
    filters.mileageTo,
  ]);

  const formatNumber = (value: string) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");


  const normalizedBrand = brand || undefined;
  const rentalPriceNum = price ? Number(price) : undefined;
  const mileageFromNum = mileageFrom ? Number(mileageFrom) : undefined;
  const mileageToNum = mileageTo ? Number(mileageTo) : undefined;

  const isSameFilters =
    filters.brand === normalizedBrand &&
    filters.rentalPrice === rentalPriceNum &&
    filters.mileageFrom === mileageFromNum &&
    filters.mileageTo === mileageToNum;

  const handleSearch = () => {
    if (isSameFilters) {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      return;
    }


    const newFilters = {
      brand: normalizedBrand,
      rentalPrice: Number.isNaN(rentalPriceNum) ? undefined : rentalPriceNum,
      mileageFrom: Number.isNaN(mileageFromNum) ? undefined : mileageFromNum,
      mileageTo: Number.isNaN(mileageToNum) ? undefined : mileageToNum,
    };

    resetCars();
    setFilters(newFilters);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.brand) params.set("brand", newFilters.brand);
      else params.delete("brand");

      if (newFilters.rentalPrice !== undefined)
        params.set("rentalPrice", String(newFilters.rentalPrice));
      else params.delete("rentalPrice");

      if (newFilters.mileageFrom !== undefined)
        params.set("mileageFrom", String(newFilters.mileageFrom));
      else params.delete("mileageFrom");

      if (newFilters.mileageTo !== undefined)
        params.set("maxMileage", String(newFilters.mileageTo));
      else params.delete("maxMileage");

      params.delete("page");

      const query = params.toString();
      const newUrl = query ? `${pathname}?${query}` : pathname;

      window.history.pushState(null, "", newUrl);
    }
  };

  return (
    <aside className={css.filter}>

      <div className={css.select}>
        <label className={css.label}>Car brand</label>
        <Select
          value={brand || undefined}
          onValueChange={(value: string) => setBrand(value)}
        >
          <SelectTrigger className={css.selectTrigger}>
            <SelectValue
              className={css.placeholder}
              placeholder="Choose a brand"
            />
          </SelectTrigger>
          <SelectContent className={css.selectContent}>
            <SelectGroup>
              {brandsOptions.map((brandOption) => (
                <SelectItem
                  key={brandOption}
                  value={brandOption}
                  className={css.item}
                >
                  {brandOption}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>


      <div className={css.select}>
        <label className={css.label}>Price / 1 hour</label>
        <Select value={price} onValueChange={(value: string) => setPrice(value)}>
          <SelectTrigger
            className={`${css.selectTrigger} ${css.selectTriggerPrice}`}
          >
            <span className={css.placeholder}>
              {price ? `To $${price}` : "Choose a price"}
            </span>
          </SelectTrigger>
          <SelectContent className={css.selectContentPrice}>
            <SelectGroup>
              {priceOptions.map((priceOption) => (
                <SelectItem
                  key={priceOption}
                  value={priceOption}
                  className={css.item}
                >
                  {priceOption}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>


      <div className={css.twoInput}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageGroup}>
          <input
            type="text"
            placeholder="From"
            className={css.mileageInputLeft}
            value={mileageFrom ? `From ${formatNumber(mileageFrom)}` : ""}
            onChange={(e) => setMileageFrom(e.target.value.replace(/\D/g, ""))}
          />
          <input
            type="text"
            placeholder="To"
            className={css.mileageInputRight}
            value={mileageTo ? `To ${formatNumber(mileageTo)}` : ""}
            onChange={(e) =>
              setMileageTo(e.target.value.replace(/\D/g, ""))
            }
          />
        </div>
      </div>

      <Button
        type="button"
        className={css.button}
        onClick={handleSearch}
        disabled={isRefreshing}
      >
        {isRefreshing ? "Updating…" : "Search"}
      </Button>
    </aside>
  );
}

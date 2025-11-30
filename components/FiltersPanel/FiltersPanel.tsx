"use client";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {fetchBrand}  from "../../lib/api/clientApi";
import { useStore } from "../../lib/store/useStore";
import CustomSelect, { Option } from "../CustomSelect/CustomSelect";
import css from "./FiltersPanel.module.css";

const FiltersPanel: React.FC = () => {
  const { data: brands = [] } = useQuery(
   { queryKey: ["brands"],
    queryFn: fetchBrand});
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);

  const brandOptions = useMemo<Option[]>(
    () => brands.map((b) => ({ label: b, value: b })),
    [brands]
  );

  const rentalPriceOptions: Option[] = useMemo(
    () => [
      { label: "$30", value: "30" },
      { label: "$40", value: "40" },
      { label: "$50", value: "50" },
      { label: "$80", value: "80" },
    ],
    []
  );

  return (
    <div className={css.panel}>
      <CustomSelect
        placeholder="Choose a brand"
        options={brandOptions}
        value={filters.brand}
        onChange={(v) => setFilters({ brand: v || undefined })}
      />

      <CustomSelect
        placeholder="Choose a price"
        options={rentalPriceOptions}
        value={filters.rentalPrice !== null ? String(filters.rentalPrice) : null}
        onChange={(v) => setFilters({ rentalPrice: v || undefined })}
      />

      <div className={css.inputs}>
        <input
          className={css.input}
          type="number"
          placeholder="Mileage from"
          value={filters.mileageFrom ?? ""}
          onChange={(e) =>
            setFilters({ mileageFrom: e.target.value ? Number(e.target.value) : null })
          }
        />
        <input
          className={css.input}
          type="number"
          placeholder="Mileage to"
          value={filters.mileageTo ?? ""}
          onChange={(e) =>
            setFilters({ mileageTo: e.target.value ? Number(e.target.value) : null })
          }
        />
      </div>
    </div>
  );
};

export default FiltersPanel;
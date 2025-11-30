"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./CustomSelect.module.css";

export type Option = { label: string; value: string };

type Props = {
  
  label?: string;
  options: Option[];
  value?: string | number | null;
  onChange: (v?: string ) => void;
  placeholder?: string;
};

const CustomSelect: React.FC<Props> = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value)?.label ?? placeholder ?? label ?? "Select";

  const handleOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [handleOutside]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.control} onClick={() => setOpen((s) => !s)} role="button" tabIndex={0}>
        <span className={styles.selected}>{selected}</span>
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className={styles.dropdown} role="listbox">
          <div
            className={styles.option}
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
          >
            — Clear —
          </div>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.option} ${value === opt.value ? styles.active : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
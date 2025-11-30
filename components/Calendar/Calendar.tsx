"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import css from "./Calendar.module.css";


const customLocale = {
  ...enGB,
  localize: {
    ...enGB.localize,
    day: (n: number) => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][n],
  },
};

registerLocale("custom-en", customLocale);

type CalendarProps = {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
};

export default function Calendar({ value, onChange }: CalendarProps) {
  const [date, setDate] = useState<Date | null>(value ?? new Date());

  const handleChange = (selected: Date | null) => {
    setDate(selected);
    onChange?.(selected);
  };

  return (
    <div className={css.wrapper}>
      <DatePicker
        selected={date}
        onChange={handleChange}
        inline
        calendarStartDay={1}
        locale="custom-en"
      />
    </div>
  );
}
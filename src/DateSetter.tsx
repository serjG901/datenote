import * as React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
registerLocale("ru", ru);

interface DateSetterProps {
  date: Date | null;
  setDate: (value: Date) => void;
}

export function DateSetter({ date, setDate }: DateSetterProps) {
  const style = `
    px-4 
    py-4 
    mb-4
    w-full 
    shadow 
    text-left 
    text-gray-700 
    rounded 
    `;

  function handleChange(value: Date): void {
    setDate(value);
  }
  return (
    <DatePicker
      locale="ru"
      className={style}
      required
      onChange={handleChange}
      placeholderText="Дата"
      dateFormat="dd.MM.yyyy"
      selected={date}
    />
  );
}

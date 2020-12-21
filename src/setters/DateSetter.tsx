import * as React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { be, enUS, ru } from "date-fns/locale";

interface DateSetterProps {
  date: Date | null;
  setDate: (value: Date) => void;
  currentLanguage: string;
  explanePlaceholder: string;
}

export function DateSetter({
  date,
  setDate,
  currentLanguage,
  explanePlaceholder,
}: DateSetterProps) {
  switch (currentLanguage) {
    case "by":
      registerLocale("by", be);
      break;
    case "ru":
      registerLocale("ru", ru);
      break;
    default:
      registerLocale("en", enUS);
  }

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
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      withPortal
      locale={currentLanguage}
      className={style}
      required
      onChange={handleChange}
      placeholderText={explanePlaceholder}
      dateFormat="dd.MM.yyyy"
      selected={date}
    />
  );
}

import * as React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { be, enUS, ru } from "date-fns/locale";
import { useLanguage } from "../language/LanguageProvider";

interface DateSetterProps {
  date: Date | null;
  setDate: (value: Date) => void;
}

export function DateSetter({ date, setDate }: DateSetterProps) {
  const languageContext = useLanguage();

  if (languageContext !== null && languageContext.language.name === "by") {
    registerLocale("by", be);
  }
  if (languageContext !== null && languageContext.language.name === "en") {
    registerLocale("en", enUS);
  }
  if (languageContext !== null && languageContext.language.name === "ru") {
    registerLocale("ru", ru);
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
      locale={languageContext.language.name}
      className={style}
      required
      onChange={handleChange}
      placeholderText={languageContext.language.date}
      dateFormat="dd.MM.yyyy"
      selected={date}
    />
  );
}

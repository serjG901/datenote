import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLanguage } from "./LanguageProvider";

interface TimeSetterProps {
  time: Date | null;
  setTime: (value: Date) => void;
}

export function TimeSetter({ time, setTime }: TimeSetterProps) {
  const languageContext = useLanguage();

  const style = `
    px-4 
    py-4 
    mb-6
    w-full 
    shadow 
    text-left 
    text-gray-700 
    rounded 
    `;

  function handleChange(value: Date) {
    setTime(value);
  }

  return languageContext !== null ? (
    <DatePicker
      withPortal
      className={style}
      required
      placeholderText={languageContext.language.time}
      showTimeSelectOnly
      timeInputLabel={`${languageContext.language.time}:`}
      showTimeInput
      dateFormat="HH:mm"
      timeFormat="HH:mm"
      onChange={handleChange}
      selected={time}
    />
  ) : null;
}

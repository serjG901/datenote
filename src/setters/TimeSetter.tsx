import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TimeSetterProps {
  time: Date | null;
  setTime: (value: Date) => void;
  explanePlaceholder: string;
}

export function TimeSetter({
  time,
  setTime,
  explanePlaceholder,
}: TimeSetterProps) {
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

  return (
    <DatePicker
      withPortal
      className={style}
      required
      placeholderText={explanePlaceholder}
      showTimeSelectOnly
      timeInputLabel={`${explanePlaceholder}:`}
      showTimeInput
      dateFormat="HH:mm"
      timeFormat="HH:mm"
      onChange={handleChange}
      selected={time}
    />
  );
}

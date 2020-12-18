import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TimeSetterProps {
  time: Date | null;
  setTime: (value: Date) => void;
}

export function TimeSetter({ time, setTime }: TimeSetterProps) {
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
      placeholderText="Время"
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={5}
      timeCaption="Время"
      dateFormat="HH:mm:ss"
      timeFormat="HH:mm"
      onChange={handleChange}
      selected={time}
    />
  );
}

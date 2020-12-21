import React from "react";
import { getTimeDifferenceInterface } from "../../pureFunctions/getTimeDifference";

interface TimeDifferenceBlockProps {
  timeDifference: getTimeDifferenceInterface;
}

export default function TimeDifferenceBlock({
  timeDifference,
}: TimeDifferenceBlockProps) {
  const styleBlock = `
    w-full 
    max-w-xs 
    mb-4
    text-left 
    text-gray-500
    text-xl
    `;

  return (
    <div className={styleBlock}>
      <p>{timeDifference.explane}</p>
      <p>{timeDifference.years}</p>
      <p>{timeDifference.months}</p>
      <p>{timeDifference.days}</p>
      <p>{timeDifference.hours}</p>
      <p>{timeDifference.minutes}</p>
      <p>{timeDifference.seconds}</p>
    </div>
  );
}

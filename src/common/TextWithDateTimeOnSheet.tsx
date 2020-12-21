import React from "react";

interface TextBlockProps {
  text: string | string[] | null;
  dateTime: string | string[] | null;
}

export default function TextWithDateTimeOnSheet({
  text,
  dateTime,
}: TextBlockProps) {
  const styleTextBlock = `
    w-full 
    max-w-xs 
    bg-white
    text-left 
    mb-4 
    px-4 
    py-4
    break-word
    shadow
    `;

  return (
    <div
      className={
        text === null || text.length < 24
          ? styleTextBlock
          : text.length < 48
          ? `${styleTextBlock} sm:max-w-screen-sm`
          : text.length < 72
          ? `${styleTextBlock} sm:max-w-screen-sm md:max-w-screen-md`
          : text.length < 96
          ? `${styleTextBlock} sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg`
          : `${styleTextBlock} sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl`
      }
    >
      <p className="pb-6">{text}</p>
      <p className="text-gray-500 text-sm">
        {new Date(Number(dateTime)).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-gray-500 text-sm">
        {new Date(Number(dateTime)).toLocaleDateString()}
      </p>
    </div>
  );
}

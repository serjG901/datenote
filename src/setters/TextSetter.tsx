import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

interface TextSetterProps {
  text: string;
  setText: (value: string) => void;
  explanePlaceholder: string;
}

export default function TextSetter({
  text,
  setText,
  explanePlaceholder,
}: TextSetterProps) {
  const style = `
    transition-all 
    duration-1000
    px-4 
    py-4
    mb-4
    w-full 
    max-w-xs 
    shadow 
    text-left 
    text-gray-700 
    rounded 
    `;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setText(event.target.value);
  }

  return (
    <TextareaAutosize
      placeholder={explanePlaceholder}
      className={
        text === null || text.length < 24
          ? style
          : text.length < 48
          ? `${style} sm:max-w-screen-sm`
          : text.length < 72
          ? `${style} sm:max-w-screen-sm md:max-w-screen-md`
          : text.length < 96
          ? `${style} sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg`
          : `${style} sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl`
      }
      required
      minRows={4}
      onChange={handleChange}
      value={text}
    />
  );
}

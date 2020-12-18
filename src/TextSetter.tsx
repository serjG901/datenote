import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

interface TextSetterProps {
  text: string;
  setText: (value: string) => void;
}

export function TextSetter({ text, setText }: TextSetterProps) {
  const style = `
    px-4 
    py-4
    pb-6 
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
      placeholder="Напишите заметку..."
      className={style}
      required
      minRows={4}
      onChange={handleChange}
      value={text}
    />
  );
}

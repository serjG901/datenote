import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button(props: ButtonProps) {
  const styleButton = `
    w-full 
    max-w-xs 
    mt-2
    px-4 
    py-4 
    bg-blue-400 
    hover:bg-blue-600 
    shadow
    hover:shadow-md
    rounded 
    text-white 
    `;

  return (
    <button className={styleButton} type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

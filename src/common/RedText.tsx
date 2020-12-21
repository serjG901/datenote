import React from "react";

interface RedTextProps {
  text: string;
}

export default function RedText({ text }: RedTextProps) {
  return <p className="text-sm text-red-500">{text}</p>;
}

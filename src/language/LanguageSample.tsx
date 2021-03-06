﻿import React from "react";
import { useLanguage } from "./LanguageProvider";

interface LanguageSampleProps {
  languageName: string;
}

export default function LanguageSample({ languageName }: LanguageSampleProps) {
  const languageContext = useLanguage();

  const style = `
    flex-1
    h-6 
    w-6 
    cursor-pointer
    text-center
    hover:bg-blue-400 
    hover:shadow
    hover:text-white
    `;

  return (
    <div
      className={`
        ${style} 
        ${
          languageContext.language.name === languageName
            ? "shadow bg-blue-400 text-white"
            : ""
        }`}
      onClick={() => languageContext.setCurrentLanguage(languageName)}
    >
      {languageName}
    </div>
  );
}

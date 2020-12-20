import React from "react";
import { useLanguage } from "./LanguageProvider";

interface LanguageSampleInterface {
  languageName: string;
}

export default function LanguageSample({
  languageName,
}: LanguageSampleInterface) {
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

  return languageContext !== null ? (
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
  ) : null;
}

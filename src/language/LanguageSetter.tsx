import React from "react";
import { languageText } from "./LanguageProvider";
import LanguageSample from "./LanguageSample";

export default function LanguageSetter() {
  const languageNames = Object.keys(languageText);
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center h-6 w-32">
        {languageNames.map((languageName) => (
          <LanguageSample key={languageName} languageName={languageName} />
        ))}
      </div>
    </div>
  );
}

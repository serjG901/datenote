﻿﻿import React, { ReactNode } from "react";

interface KeyStringInterface {
  [key: string]: CurrentLanguageInterface;
}

export const languageText: KeyStringInterface = {
  by: {
    name: "by",
    create: "Стварыць",
    copyLink: "Скапіяваць спасылку",
    writeNote: "Напішыце нататку...",
    date: "Дата",
    time: "Час",
    copySucces: "Спасылка скапіявана",
    copyCrash:
      "Вы не можаце скапіяваць спасылку. Праблема ў пратаколе падключэння або ў гэтым браўзеры.",
    now: "зараз",
    passed: "прайшло",
    left: "засталося",
  },
  en: {
    name: "en",
    create: "Create",
    copyLink: "Copy link",
    writeNote: "Write note...",
    date: "Date",
    time: "Time",
    copySucces: "The link copied",
    copyCrash:
      "You can not copy the link. This problem in connection protocol or current browser.",
    now: "now",
    passed: "have passed",
    left: "left",
  },
  ru: {
    name: "ru",
    create: "Создать",
    copyLink: "Копировать ссылку",
    writeNote: "Напишите заметку...",
    date: "Дата",
    time: "Время",
    copySucces: "Ссылка скопирована",
    copyCrash:
      "Вы не можете скопировать ссылку. Проблема в протоколе подключения или в текущем браузере.",
    now: "сейчас",
    passed: "прошло",
    left: "осталось",
  },
};

export interface CurrentLanguageInterface {
  name: string;
  create: string;
  copyLink: string;
  writeNote: string;
  date: string;
  time: string;
  copySucces: string;
  copyCrash: string;
  now: string;
  passed: string;
  left: string;
}

function initialSetLanguage() {}

interface LanguageContextInterface {
  language: CurrentLanguageInterface;
  setCurrentLanguage: (language: string) => void;
}

const LanguageContext = React.createContext<LanguageContextInterface>({
  language: languageText.en,
  setCurrentLanguage: initialSetLanguage,
});

export const useLanguage = () => {
  return React.useContext(LanguageContext);
};

interface LanguageProviderinterface {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderinterface) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(
    window.localStorage.getItem("language") || "en"
  );

  React.useEffect(() => {
    window.localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{ language: languageText[currentLanguage], setCurrentLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

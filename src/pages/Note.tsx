import * as React from "react";
import { createBrowserHistory } from "history";
import queryString from "query-string";
import {
  getTimeDifference,
  getTimeDifferenceInterface,
} from "../pureFunctions/getTimeDifference";
import { useLanguage } from "../language/LanguageProvider";

export default function Note() {
  const languageContext = useLanguage();

  const history = createBrowserHistory();

  const note = history.location.hash
    ? queryString.parse(history.location.hash)
    : null;

  const [
    timeDifference,
    setTimeDifference,
  ] = React.useState<getTimeDifferenceInterface | null>(() => {
    if (note !== null)
      return getTimeDifference(
        Number(note.dateTime),
        languageContext.language.name,
        languageContext.language.passed,
        languageContext.language.now,
        languageContext.language.left
      );
    return null;
  });

  const [statusCopyLink, setStatusCopyLink] = React.useState("");

  React.useEffect(() => {
    if (note !== null) {
      const timeoutlId = setTimeout(() => {
        const time =
          getTimeDifference(
            Number(note.dateTime),
            languageContext.language.name,
            languageContext.language.passed,
            languageContext.language.now,
            languageContext.language.left
          ) || "";
        setTimeDifference(time);
      }, 1000);
      return () => {
        clearTimeout(timeoutlId);
      };
    }
  }, [timeDifference]);

  const stylePage = `
    p-9 
    flex 
    flex-col 
    items-center 
    justify-center 
    text-2xl
    `;
  const styleBlock = `
    w-full 
    max-w-xs 
    text-left 
    mb-4 
    `;
  const styleTextBlock = `
    ${styleBlock}
    px-4 
    py-4
    break-word
    shadow
    `;
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

  return note ? (
    <div className={stylePage}>
      <div
        className={
          note.text === null || note.text.length < 24
            ? styleTextBlock
            : note.text.length < 48
            ? `${styleTextBlock} sm:max-w-screen-sm`
            : note.text.length < 72
            ? `${styleTextBlock} sm:max-w-screen-sm md:max-w-screen-md`
            : note.text.length < 96
            ? `${styleTextBlock} sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg`
            : `${styleTextBlock} sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl`
        }
      >
        <p className="pb-6">{note.text}</p>
        <p className="text-gray-500 text-sm">
          {new Date(Number(note.dateTime)).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">
          {new Date(Number(note.dateTime)).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      {timeDifference !== null ? (
        <div className={`${styleBlock} text-gray-500 text-xl`}>
          <p>{timeDifference.explane}</p>
          {timeDifference.years !== "" ? <p>{timeDifference.years}</p> : null}
          {timeDifference.months !== "" ? <p>{timeDifference.months}</p> : null}
          {timeDifference.days !== "" ? <p>{timeDifference.days}</p> : null}
          {timeDifference.hours !== "" ? <p>{timeDifference.hours}</p> : null}
          {timeDifference.minutes !== "" ? (
            <p>{timeDifference.minutes}</p>
          ) : null}
          {timeDifference.seconds !== "" ? (
            <p>{timeDifference.seconds}</p>
          ) : null}
        </div>
      ) : null}
      <button
        className={styleButton}
        onClick={() => {
          setStatusCopyLink("");
          try {
            navigator.clipboard.writeText(window.location.href);
            setStatusCopyLink("succes");
          } catch (e) {
            setStatusCopyLink("crash");
          }
        }}
      >
        {languageContext.language.copyLink}
      </button>
      {statusCopyLink === "succes" ? (
        <p className="text-sm text-red-500">
          {languageContext.language.copySucces}
        </p>
      ) : statusCopyLink === "crash" ? (
        <p className="text-sm text-red-500">
          {languageContext.language.copyCrash}
        </p>
      ) : null}
    </div>
  ) : null;
}

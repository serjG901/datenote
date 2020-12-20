import * as React from "react";
import { createBrowserHistory } from "history";
import queryString from "query-string";
import {
  getTimeDifference,
  getTimeDifferenceInterface,
} from "../pureFunctions/getTimeDifference";
import { useLanguage } from "../language/LanguageProvider";

export function Note() {
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
      return getTimeDifference(Number(note.dateTime), languageContext.language);
    return null;
  });

  const [messageForUser, setMessageForUser] = React.useState("");

  React.useEffect(() => {
    if (note !== null) {
      const timeoutlId = setTimeout(() => {
        const time =
          getTimeDifference(Number(note.dateTime), languageContext.language) ||
          "";
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
    text-4xl
    `;
  const styleBlock = `
    w-full 
    max-w-xs 
    text-left 
    mb-4 
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
            ? `${styleBlock} break-word`
            : note.text.length < 48
            ? `${styleBlock} break-word sm:max-w-screen-sm`
            : note.text.length < 72
            ? `${styleBlock} break-word sm:max-w-screen-sm md:max-w-screen-md`
            : note.text.length < 96
            ? `${styleBlock} break-word sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg`
            : `${styleBlock} break-word sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl`
        }
      >
        {note.text}
      </div>
      {timeDifference !== null ? (
        <div className={`${styleBlock} text-gray-500 text-2xl`}>
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
          <p>{timeDifference.explane}</p>
          <p className="text-2xl">
            {new Date(Number(note.dateTime)).toLocaleString()}
          </p>
        </div>
      ) : null}
      <button
        className={styleButton}
        onClick={() => {
          try {
            navigator.clipboard.writeText(window.location.href);
            setMessageForUser(languageContext.language.copySucces);
          } catch (e) {
            setMessageForUser(languageContext.language.copyCrash);
          }
        }}
      >
        {languageContext.language.copyLink}
      </button>
      {messageForUser !== "" ? (
        <p className="text-sm text-red-500">{messageForUser}</p>
      ) : null}
    </div>
  ) : null;
}

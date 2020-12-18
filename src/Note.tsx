import * as React from "react";
import { createBrowserHistory } from "history";
import queryString from "query-string";
import {
  getTimeDifference,
  getTimeDifferenceInterface,
} from "./getTimeDifference";

export function Note() {
  const history = createBrowserHistory();
  const note = history.location.hash
    ? queryString.parse(history.location.hash)
    : null;
  const [
    timeDifference,
    setTimeDifference,
  ] = React.useState<getTimeDifferenceInterface | null>(() => {
    if (note === null) return null;
    return getTimeDifference(Number(note.dateTime));
  });

  React.useEffect(() => {
    if (note !== null && note !== undefined) {
      const timeoutlId = setTimeout(() => {
        const time = getTimeDifference(Number(note.dateTime)) || "";
        setTimeDifference(time);
      }, 1000);
      return () => {
        clearTimeout(timeoutlId);
      };
    }
  }, [timeDifference]);

  const stylePage = `
    px-8 
    py-12 
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
    py-2 
    bg-blue-400 
    hover:bg-blue-600 
    shadow
    hover:shadow-md
    rounded 
    text-white  
    `;

  return note ? (
    <div className={stylePage}>
      <div className={`${styleBlock} break-word`}>{note.text}</div>
      {timeDifference !== null ? (
        <div className={`${styleBlock} text-gray-500`}>
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
          navigator.clipboard.writeText(window.location.href);
        }}
      >
        Копировать ссылку
      </button>
    </div>
  ) : null;
}

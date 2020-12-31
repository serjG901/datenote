import * as React from "react";
import {
  getTimeDifference,
  getTimeDifferenceInterface,
} from "../../lib/getTimeDifference";
import { useLanguage } from "../../language/LanguageProvider";
import TextWithDateTimeOnSheet from "../../common/TextWithDateTimeOnSheet";
import TimeDifferenceBlock from "./TimeDifferenceBlock";
import Button from "../../common/Button";
import RedText from "../../common/RedText";

interface NoteProps {
  text: string | string[] | null;
  dateTime: string | string[] | null;
}

export default function Note({ text, dateTime }: NoteProps) {
  const languageContext = useLanguage();

  const [
    timeDifference,
    setTimeDifference,
  ] = React.useState<getTimeDifferenceInterface>(() => {
    return getTimeDifference(
      new Date().setMilliseconds(0),
      Number(dateTime),
      languageContext.language.name,
      languageContext.language.passed,
      languageContext.language.now,
      languageContext.language.left
    );
  });

  const [statusCopyLink, setStatusCopyLink] = React.useState<
    "copySucces" | "copyCrash" | ""
  >("");

  function handleCopyLink() {
    setStatusCopyLink("");
    try {
      navigator.clipboard.writeText(window.location.href);
      setStatusCopyLink("copySucces");
    } catch (e) {
      setStatusCopyLink("copyCrash");
    }
  }

  React.useEffect(() => {
    const timeoutlId = setTimeout(() => {
      const time =
        getTimeDifference(
          new Date().setMilliseconds(0),
          Number(dateTime),
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
  }, [timeDifference]);

  const stylePage = `
    p-9 
    flex 
    flex-col 
    items-center 
    text-2xl
    `;

  return (
    <div className={stylePage}>
      <TextWithDateTimeOnSheet text={text} dateTime={dateTime} />
      {timeDifference !== null ? (
        <TimeDifferenceBlock timeDifference={timeDifference} />
      ) : null}
      <Button
        onClick={handleCopyLink}
        text={languageContext.language.copyLink}
      />
      {statusCopyLink !== "" ? (
        <RedText text={languageContext.language[statusCopyLink]} />
      ) : null}
    </div>
  );
}

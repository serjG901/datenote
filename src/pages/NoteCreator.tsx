import * as React from "react";
import { createBrowserHistory } from "history";
import queryString from "query-string";
import { useLanguage } from "../language/LanguageProvider";
import TextSetter from "../setters/TextSetter";
import DateSetter from "../setters/DateSetter";
import TimeSetter from "../setters/TimeSetter";
import Button from "../common/Button";

interface NoteCreatorProps {
  onPage: (value: "note" | "create") => void;
}

export default function NoteCreator({ onPage }: NoteCreatorProps) {
  const languageContext = useLanguage();

  const history = createBrowserHistory();

  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<Date | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (text === "") return;
    if (time === null) return;
    if (date === null) return;

    const diffTime =
      Date.parse(time.toString()) - new Date().setHours(0, 0, 0, 0);

    const note = queryString.stringify({
      text,
      dateTime: Date.parse(date.toString()) + diffTime,
    });

    history.push(`#${note}`);
    onPage("note");
  }

  const stylePage = `
    p-9 
    flex 
    flex-col 
    items-center 
    text-2xl
    `;

  return (
    <form className={stylePage} onSubmit={handleSubmit}>
      <TextSetter
        text={text}
        setText={setText}
        explanePlaceholder={languageContext.language.writeNote}
      />
      <DateSetter
        date={date}
        setDate={setDate}
        currentLanguage={languageContext.language.name}
        explanePlaceholder={languageContext.language.date}
      />
      <TimeSetter
        time={time}
        setTime={setTime}
        explanePlaceholder={languageContext.language.time}
      />
      <Button type="submit" text={languageContext.language.create} />
    </form>
  );
}

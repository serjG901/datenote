import * as React from "react";
import { createBrowserHistory } from "history";
import queryString from "query-string";
import { TextSetter } from "./TextSetter";
import { DateSetter } from "./DateSetter";
import { TimeSetter } from "./TimeSetter";

export function NoteCreator() {
  const history = createBrowserHistory();
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<Date | null>(null);

  function handleSubmit(): void {
    if (text === "") return;
    if (time === null) return;
    if (date === null) return;
    const diffTime =
      Date.parse(time.toString()) - new Date().setHours(0, 0, 0, 0);
    const note = queryString.stringify({
      text,
      dateTime: Date.parse(date.toString()) + diffTime,
    });
    history.push(`/note?#${note}`);
  }

  const styleForm = `
    p-9 
    h-screen 
    flex 
    flex-col 
    items-center 
    text-2xl
    `;
  const styleButton = `
    w-full 
    max-w-xs 
    px-4 
    pt-2
    pb-4 
    bg-blue-400 
    hover:bg-blue-600 
    shadow
    hover:shadow-md
    rounded 
    text-white 
    text-4xl
    align-middle
    `;

  return (
    <form className={styleForm} onSubmit={handleSubmit}>
      <TextSetter text={text} setText={setText} />
      <DateSetter date={date} setDate={setDate} />
      <TimeSetter time={time} setTime={setTime} />
      <button className={styleButton} type="submit">
        Создать
      </button>
    </form>
  );
}

import * as React from "react";
import "./styles.css";
import { createBrowserHistory } from "history";
import queryString from "query-string";
import { LanguageProvider } from "./language/LanguageProvider";
import AppName from "./AppName";
import LanguageSetter from "./language/LanguageSetter";
import NoteCreator from "./pages/NoteCreator";
import Note from "./pages/note/Note";
import NotFound from "./pages/NotFound";

export default function App() {
  const history = createBrowserHistory();

  const note = history.location.hash
    ? queryString.parse(history.location.hash)
    : null;

  const [page, setPage] = React.useState<"note" | "create">(
    note !== null && note.text && note.dateTime ? "note" : "create"
  );

  React.useEffect(() => {
    let unlisten = history.listen(({ action, location }) => {
      const note = location.hash ? queryString.parse(location.hash) : null;
      note !== null && note.text && note.dateTime
        ? setPage("note")
        : setPage("create");
    });
    return () => {
      unlisten();
    };
  });

  return (
    <LanguageProvider>
      <AppName />
      <LanguageSetter />
      {page === "create" ? (
        <NoteCreator onPage={setPage} />
      ) : page === "note" && note !== null && note.text && note.dateTime ? (
        <Note text={note.text} dateTime={note.dateTime} />
      ) : (
        <NotFound />
      )}
    </LanguageProvider>
  );
}

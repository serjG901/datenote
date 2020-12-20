import * as React from "react";
import "./styles.css";
import { createBrowserHistory } from "history";
import { NoteCreator } from "./pages/NoteCreator";
import { Note } from "./pages/Note";
import { AppName } from "./AppName";
import { LanguageProvider } from "./language/LanguageProvider";
import { LanguageSetter } from "./language/LanguageSetter";

export default function App() {
  const history = createBrowserHistory();

  const [page, setPage] = React.useState(location.hash ? "note" : "create");

  React.useEffect(() => {
    let unlisten = history.listen(({ action, location }) => {
      location.hash ? setPage("note") : setPage("create");
    });
    return () => {
      unlisten();
    };
  });

  return (
    <LanguageProvider>
      <AppName />
      <LanguageSetter />
      {page === "note" ? <Note /> : <NoteCreator onNote={setPage} />}
    </LanguageProvider>
  );
}

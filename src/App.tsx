import * as React from "react";
import "./styles.css";
import { createBrowserHistory } from "history";
import { LanguageProvider } from "./language/LanguageProvider";
import AppName from "./AppName";
import LanguageSetter from "./language/LanguageSetter";
import NoteCreator from "./pages/NoteCreator";
import Note from "./pages/Note";
import NotFound from "./pages/NotFound";

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
      {page === "create" ? (
        <NoteCreator onNote={setPage} />
      ) : page === "note" ? (
        <Note />
      ) : (
        <NotFound />
      )}
    </LanguageProvider>
  );
}

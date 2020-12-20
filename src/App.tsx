import * as React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NoteCreator } from "./NoteCreator";
import { Note } from "./Note";
import { AppName } from "./AppName";
import { LanguageProvider } from "./LanguageProvider";
import { LanguageSetter } from "./LanguageSetter";

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppName />
        <LanguageSetter />
        <Switch>
          <Route path="/note">
            <Note />
          </Route>
          <Route path="/">
            <NoteCreator />
          </Route>
        </Switch>
      </Router>
    </LanguageProvider>
  );
}

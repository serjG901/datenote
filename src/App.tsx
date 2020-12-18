import * as React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NoteCreator } from "./NoteCreator";
import { Note } from "./Note";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/note">
          <Note />
        </Route>
        <Route path="/">
          <NoteCreator />
        </Route>
      </Switch>
    </Router>
  );
}

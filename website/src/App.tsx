import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Intro from "./Intro";
import Query from "./Query";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Intro />
          </Route>
          <Route exact path="/query">
            <Query />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

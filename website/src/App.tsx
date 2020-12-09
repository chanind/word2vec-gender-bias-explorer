import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Intro from './Intro';
import Query from './Query';
import OctocatCorner from './components/OctocatCorner';

function App() {
  return (
    <div className="App">
      <OctocatCorner />
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

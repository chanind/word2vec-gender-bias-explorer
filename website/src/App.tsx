import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Intro from './Intro';
import Query from './Query';
import OctocatCorner from './components/OctocatCorner';

const ROOT_PATH = process.env.REACT_APP_ROOT_PATH || '/';

function App() {
  return (
    <div className="App">
      <OctocatCorner />
      <Router basename={ROOT_PATH}>
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

import React from "react";
import {Route, IndexRoute} from 'react-router';

import App from "./components/App";
import Home from "./components/Home";
import About from './components/About';

import Farm from "./components/Farm/Farm";
import Summary from "./components/Farm/Summary";
import Stats from "./components/Farm/Stats";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path=":id" component={Farm}>
      <IndexRoute component={Summary} />
      <Route path="stats" component={Stats} />
    </Route>
  </Route>
);

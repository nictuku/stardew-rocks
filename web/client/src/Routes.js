import React from "react";
import {Route, IndexRoute} from 'react-router';

import App from "./components/App";
import Home from "./components/Home";
import Farm from "./components/Farm";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path=":id" component={Farm} />
  </Route>
);

import React from "react";
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import mainReducer from "./reducers/mainReducer";
import App from "./components/App";
import Home from "./components/Home";

// Redux store stuff
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(mainReducer);

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>
);

export default routes;

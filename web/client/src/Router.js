import React from 'react';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import * as ga from 'react-ga';

import Routes from './Routes';
import configureStore from './configureStore';

// google analytics
ga.initialize('UA-75597006-1');

function logPageView () { // eslint-disable-line
  ga.pageview(this.state.location.pathname);
}

const store = configureStore();


if (module.hot) {
  module.hot.decline('./Routes');
}

export default (
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={logPageView}>
      {Routes}
    </Router>
  </Provider>
);

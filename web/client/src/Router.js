import React from 'react';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import moment from 'moment';
import * as ga from 'react-ga';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';

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

addLocaleData([...en]);
moment.locale(navigator.language);

export default (
  <Provider store={store}>
    <IntlProvider locale={navigator.language} defaultLocale="en-US">
      <Router history={browserHistory} onUpdate={logPageView}>
        {Routes}
      </Router>
    </IntlProvider>
  </Provider>
);

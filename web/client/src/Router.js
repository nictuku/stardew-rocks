import React from 'react';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import * as ga from 'react-ga';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

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

addLocaleData([...en, ...es]);

const {messages, locale} = window.Stardewfarm;
moment.locale(locale);

var intlMessages = _(messages)
  .map(({id, defaultMessage}) => ({[id]: defaultMessage}))
  .transform((messagesObj, message) => _.assign(messagesObj, message), {})
  .value();

export default (
  <Provider store={store}>
    <IntlProvider
      defaultLocale="en-US"
      locale={locale}
      messages={intlMessages}
    >
      <Router history={browserHistory} onUpdate={logPageView}>
        {Routes}
      </Router>
    </IntlProvider>
  </Provider>
);

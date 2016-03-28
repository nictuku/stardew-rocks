// hot reload stuff
import 'systemjs-hot-reloader/default-listener.js';

export function __reload(m) { // eslint-disable-line
  if (m.component.state) {
    component.setState(m.component.state);
  }
}

// Import global stuff
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Bootstrap web app
import Routes from './Routes';
import React from 'react';
import ReactDom from 'react-dom';

export let component = ReactDom.render(<Routes />, document.getElementById('app'));

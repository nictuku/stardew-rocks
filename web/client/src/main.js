// Import global stuff
import 'font-awesome/css/font-awesome.min.css!';
import 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Bootstrap web app
import Routes from './Routes';
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(<Routes />, document.getElementById('app'));

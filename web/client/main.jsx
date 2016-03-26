// Import global stuff
import 'font-awesome/css/font-awesome.min.css!';
import 'lodash';

// Bootstrap react
import React from 'react';
import ReactDom from 'react-dom';
import Routes from 'app/Routes.jsx!';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDom.render(<Routes />, document.getElementById('app'));

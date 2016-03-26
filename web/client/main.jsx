// Import global stuff
import 'font-awesome/css/font-awesome.min.css!';
import 'lodash';

// Bootstrap react
import ReactDom from 'react-dom';
import routes from 'app/routes.jsx!';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDom.render(routes, document.getElementById('app'));

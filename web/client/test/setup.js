const {jsdom} = require('jsdom');
global.document = jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.location = document.location;
global.$traceurRuntime = require('traceur-runtime');
global.navigator = {
  userAgent: 'node.js'
};

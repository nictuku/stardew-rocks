global.navigator = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36'
};

var testsContext = require.context(".", true, /\.spec$/);
testsContext.keys().forEach(testsContext);

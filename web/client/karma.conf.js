module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha', 'sinon'],
    browsers: ['jsdom'],
    reporters: ['nyan'],
    nyanReporter: {
      renderOnRunCompleteOnly: true
    },
    files: [
      'test/index.js'
    ],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: {
      devtool: 'eval',
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react'],
            plugins: [
              'transform-decorators-legacy',
              'transform-object-rest-spread',
              'transform-class-properties'
            ]
          }
        }, {
          test: /\.json$/,
          loader: 'json'
        }]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};

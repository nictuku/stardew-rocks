module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    browsers: ['jsdom'],
    reporters: ['nyan'],
    files: [
      'test/index.js'
    ],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
      module: {
        noParse: [
          /\/sinon\.js/
        ],
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

const combineLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {path: __dirname, filename: 'bundle.js'},
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: combineLoaders([{
        loader: 'react-hot'
      }, {
        loader:'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }])
    }]
  },
  devServer: {
    proxy: {
      "*": "http://localhost:8080"
    },
    stats: {colors: true},
    port: '3000',
    headers: {"X-Custom-Header": "yes"}
  }
};

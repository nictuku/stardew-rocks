var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  entry: './main',
  output: {
    path: __dirname + '/dist', publicPath: 'dist/', filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      { test: /\.ts/, loaders: ['ts-loader'] },
      { test: /\.css$/, loaders: ['css-loader'] }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: '3000',
      server: {
        baseDir: ['.']
      }
    })
  ]
};

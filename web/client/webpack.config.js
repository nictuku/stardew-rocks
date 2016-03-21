//var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

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
      { test: /\.ts/, loaders: ['ts-loader'] }
    ]
  },
  ts: {
    transpileOnly: true
  },
  devServer: {
    port: 3001
  }
  // plugins: [
  //   new BrowserSyncPlugin({
  //     host: 'localhost',
  //     port: '3000',
  //     proxy: 'http://localhost:3001/'
  //   }, {
  //     reload: false
  //   })
  // ]
};

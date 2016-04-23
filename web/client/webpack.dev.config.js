module.exports = {
  entry: [
    './src/main.js'
  ],
  devtool: 'eval',
  output: {path: __dirname, filename: 'bundle.js'},
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot', 'babel']
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

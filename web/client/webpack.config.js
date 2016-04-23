module.exports = {
  entry: [
    './src/main.js'
  ],
  devtool: 'source-map',
  output: {path: __dirname, filename: 'bundle.js'},
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  }
};

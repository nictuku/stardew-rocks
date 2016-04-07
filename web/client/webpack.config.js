module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {path: __dirname, filename: 'bundle.js'},
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
      }
    }]
  }
};

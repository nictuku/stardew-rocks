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
    port: 3001,
    historyApiFallback: true
  }
};

var webpack = require("webpack");

module.exports = {
  entry: './main',
  output: {
    path: __dirname + '/dist', publicPath: 'dist/', filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    alias: {
      materializecss: 'materialize-css/dist/css/materialize.css',
      materialize: 'materialize-css/dist/js/materialize.js'
    }
  },
  module: {
    loaders: [{
      test: /\.ts/, loader: 'ts-loader'
    }, {
      test: /materialize-css\/dist\/js\/materialize\.js/, loader: 'imports?materializecss'
    }]
  },
  ts: {
    transpileOnly: true
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        Hammer: "hammerjs/hammer"
    })
  ],
  devServer: {
    port: 3001,
    historyApiFallback: true
  }
};

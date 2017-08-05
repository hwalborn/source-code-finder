const path = require('path');

const APP_DIR           = path.resolve(__dirname, 'src');
const BUILD_DIR         = path.resolve(__dirname, 'dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [ "react", "es2015" ]
        }
      }
    ]
  },
  resolve: {
    extensions: [ ".js" ]
  },
  devServer: {
    contentBase: './dist',
    port: 8000
  }
}

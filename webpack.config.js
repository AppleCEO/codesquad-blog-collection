const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: {
    app: './public/entry/index.js',
    admin: './public/admin/index.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/entry/index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin-index.html',
      template: 'public/admin/admin-index.html',
      chunks: ['admin']
    })
  ]
};

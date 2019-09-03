const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
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
    filename: '[name].[chunkhash].js'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/entry/index.html',
      chunks: ['app', 'vendors']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin-index.html',
      template: 'public/admin/admin-index.html',
      chunks: ['admin', 'vendors']
    }),
    new CleanWebpackPlugin()
  ]
};

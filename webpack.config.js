const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: [
      path.join(__dirname, './src/index.js'),
      // path.join(__dirname, './src/asset/image/favicon/favicon.ico'),
      path.join(__dirname, './src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: [/\.html?$/, /\.ico/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },

      {
        test: [/\.jpg/, /script\.txt/],
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [
    production &&
      new BabiliPlugin(
        {},
        {
          sourceMap: false,
          comments: false,
        }
      ),

    production && new webpack.HashedModuleIdsPlugin(),

    !production && new webpack.NamedModulesPlugin(),
  ].filter(Boolean),

  devServer: {
    port: 8082,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}

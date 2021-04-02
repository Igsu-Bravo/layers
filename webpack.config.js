const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  return {
    // Entry point
    entry: './src/frontend.tsx',
    output: {
        // '/' as the base path for the SPA
        publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, 'src'),
          loader: 'ts-loader'
        }
      ]
    },
    plugins: [
      // generate index.html from template
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false
      })
    ],
    // Generate source maps for debugging
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      // 404 fallback
      historyApiFallback: true
    }
  }
}
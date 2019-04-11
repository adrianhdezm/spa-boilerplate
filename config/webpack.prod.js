'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { CommonWebpackConfig, ApplicationPaths } = require('./webpack.common');
const { OUTPUT_PATH, OUTPUT_STYLES_FOLDER, OUTPUT_SCRIPTS_FOLDER } = ApplicationPaths;

module.exports = merge(CommonWebpackConfig, {
  mode: 'production',
  output: {
    path: OUTPUT_PATH,
    filename: `${OUTPUT_SCRIPTS_FOLDER}/[name].[chunkhash:8].js`,
    chunkFilename: `${OUTPUT_SCRIPTS_FOLDER}/[name].[chunkhash:8].chunk.js`
  },
  // Don't attempt to continue if there are any errors.
  bail: true,
  // Generating sourcemaps in production. This is slow but gives good results.
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${OUTPUT_STYLES_FOLDER}/[name].[contenthash:8].css`,
      chunkFilename: `${OUTPUT_STYLES_FOLDER}/[name].[contenthash:8].chunk.css`
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
});

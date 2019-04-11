'use strict';

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {
  OUTPUT_PATH,
  OUTPUT_SCRIPTS_FOLDER,
  HTML_TEMPLATE_PATH,
  FAVICON_PATH,
  POLYFILLS_ENTRY_PATH,
  APPLICATION_ENTRY_PATH,
  OUTPUT_IMAGES_FOLDER,
  OUTPUT_STYLES_FOLDER
} = require('./paths');

const HOST = process.env.HOST || 'localhost';
const PORT = parseInt(process.env.PORT, 10) || 8080;

const openDevServer = process.platform === 'darwin' ? 'Google Chrome' : true;

module.exports = (env) => {
  const isProdEnv = env.production ? true : env.development ? false : undefined;
  const shouldRunBundleAnalysis = env.production && env.analysis;

  return Object.assign(
    {
      mode: isProdEnv ? 'production' : 'development',
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
      },
      entry: {
        polyfills: POLYFILLS_ENTRY_PATH,
        app: APPLICATION_ENTRY_PATH
      },
      output: {
        path: OUTPUT_PATH,
        filename: `${OUTPUT_SCRIPTS_FOLDER}/[name].[${isProdEnv ? 'chunkhash' : 'hash'}:8].js`,
        chunkFilename: `${OUTPUT_SCRIPTS_FOLDER}/[name].[${
          isProdEnv ? 'chunkhash' : 'hash'
        }:8].chunk.js`
      },
      devtool: isProdEnv ? 'source-map' : 'inline-source-map',
      // Don't attempt to continue if there are any errors in production.
      bail: isProdEnv,
      module: {
        // Makes missing exports an error instead of warning
        strictExportPresence: true,
        rules: [
          {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [
              { loader: 'ts-loader', options: { transpileOnly: true } },
              'stylelint-custom-processor-loader'
            ]
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
              collapseWhitespace: false
            }
          },
          {
            test: /\.css$/,
            use: [
              isProdEnv && MiniCssExtractPlugin.loader,
              !isProdEnv && 'style-loader',
              'css-loader'
            ].filter(Boolean)
          },
          {
            test: /.svg$/,
            loader: '@svgr/webpack'
          },
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: OUTPUT_IMAGES_FOLDER
            }
          }
        ]
      },
      performance: isProdEnv
        ? {
            hints: 'error',
            maxEntrypointSize: 1000000,
            maxAssetSize: 500000
          }
        : { hints: false },
      optimization: {
        minimize: isProdEnv,
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      },
      plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new ForkTsCheckerWebpackPlugin(
          Object.assign(
            {
              async: false,
              tslint: true,
              memoryLimit: 4096,
              silent: true
            },
            isProdEnv
              ? { useTypescriptIncrementalApi: false }
              : { useTypescriptIncrementalApi: true }
          )
        ),
        !isProdEnv &&
          new ForkTsCheckerNotifierWebpackPlugin({
            title: 'TypeScript',
            excludeWarnings: false
          }),
        isProdEnv &&
          new MiniCssExtractPlugin({
            filename: `${OUTPUT_STYLES_FOLDER}/[name].[contenthash:8].css`,
            chunkFilename: `${OUTPUT_STYLES_FOLDER}/[name].[contenthash:8].chunk.css`
          }),
        !isProdEnv && new webpack.HotModuleReplacementPlugin(),
        isProdEnv &&
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
        new HtmlWebpackPlugin(
          Object.assign(
            {},
            {
              template: HTML_TEMPLATE_PATH,
              inject: true,
              favicon: FAVICON_PATH
            },
            isProdEnv
              ? {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              : undefined
          )
        ),
        shouldRunBundleAnalysis && new BundleAnalyzerPlugin()
      ].filter(Boolean)
    },
    !isProdEnv
      ? {
          devServer: {
            // only dev
            contentBase: OUTPUT_PATH,
            compress: true,
            watchContentBase: true,
            hot: true,
            port: PORT,
            host: HOST,
            overlay: {
              errors: true,
              warnings: true
            },
            open: openDevServer,
            publicPath: '/'
          }
        }
      : {}
  );
};
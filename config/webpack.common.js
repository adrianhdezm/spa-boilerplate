'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const OUTPUT_FOLDER = 'dist';
const ASSETS_FOLDER = 'assets';
const OUTPUT_IMAGES_FOLDER = 'images';

const PROJECT_ROOT_PATH = path.resolve(__dirname, '..');
const APPLICATION_SOURCES_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
const OUTPUT_PATH = path.resolve(PROJECT_ROOT_PATH, OUTPUT_FOLDER);
const ASSETS_PATH = path.resolve(APPLICATION_SOURCES_PATH, ASSETS_FOLDER);

const ApplicationPaths = {
  OUTPUT_PATH,
  OUTPUT_FOLDER,
  OUTPUT_SCRIPTS_FOLDER: 'scripts',
  OUTPUT_STYLES_FOLDER: 'styles'
};

const CommonWebpackConfig = {
  entry: {
    app: path.resolve(APPLICATION_SOURCES_PATH, 'index.ts')
  },
  module: {
    // Makes missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          removeComments: false,
          collapseWhitespace: false
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: OUTPUT_IMAGES_FOLDER
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
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
    new CleanWebpackPlugin({ verbose: true }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(ASSETS_PATH, 'index.html'),
      inject: true
    })
  ]
};

module.exports = {
  ApplicationPaths,
  CommonWebpackConfig
};

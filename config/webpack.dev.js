'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { CommonWebpackConfig, ApplicationPaths } = require('./webpack.common');
const { OUTPUT_PATH, OUTPUT_SCRIPTS_FOLDER } = ApplicationPaths;

const HOST = process.env.HOST || 'localhost';
const PORT = parseInt(process.env.PORT, 10) || 8080;

const openBrowserCmd = 'Google Chrome';

module.exports = merge(CommonWebpackConfig, {
	mode: 'development',
	output: {
		path: OUTPUT_PATH,
		filename: `${OUTPUT_SCRIPTS_FOLDER}/[name].[hash:8].js`,
		chunkFilename: `${OUTPUT_SCRIPTS_FOLDER}/[name].[hash:8].chunk.js`
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: OUTPUT_PATH,
		compress: true,
		watchContentBase: true,
		hot: true,
		port: PORT,
		host: HOST,
		open: openBrowserCmd
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		// This is necessary to emit hot updates (currently CSS only):
		new webpack.HotModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			tslint: true, useTypescriptIncrementalApi: true
		}),
		new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false })
	]
});

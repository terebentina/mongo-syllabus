const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelQuery = {
	presets: ['es2015', 'stage-0', 'react'],
};

module.exports = {
	context: __dirname,
	entry: {
		app: [path.resolve(__dirname, './src/client/index')],
	},
	output: {
		path: path.join(__dirname, 'static'),
		filename: '[name].js',
		publicPath: '/static',
		pathinfo: true,
		sourceMapFilename: '[name].map',
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', query: babelQuery, include: path.join(__dirname, 'src/client') },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss') },
		],
	},
	postcss: [
		precss(),
	],
	devtool: false,
	debug: false,
	cache: false,
	target: 'web',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('[name].css'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
};

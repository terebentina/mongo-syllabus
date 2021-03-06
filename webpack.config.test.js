const path = require('path');
const webpack = require('webpack');
const precss = require('precss');

const babelQuery = {
	presets: ['es2015', 'stage-0', 'react'],
};

module.exports = {
	entry: {
		test: [path.join(__dirname, 'tests.bootstrap.js')],
	},
	output: {
		path: path.join(__dirname, './static'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['', '.js', '', '.json'],
		modulesDirectories: ['src', 'node_modules'],
		root: path.resolve(__dirname, './src'),
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', query: babelQuery, exclude: path.join(__dirname, 'node_modules') },
			{ test: /\.css$/, loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss' },
			{ test: /\.json$/, loader: 'json' },
		],
	},
	postcss: [
		precss(),
	],
	node: {
		fs: 'empty',
	},
};

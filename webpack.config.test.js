var path = require('path');
var webpack = require('webpack');
var AUTOPREFIXER_PARAMS = 'browsers=last 2 version';

module.exports = {
	entry: {
		test: [path.join(__dirname, 'tests.bootstrap.js')],
	},
	output: {
		path: path.join(__dirname, './static'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.scss$/, loader: 'style!css?sourceMap!autoprefixer?' + AUTOPREFIXER_PARAMS + '!sass?outputStyle=expanded&sourceMap&sourceMapContents' },
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
			}
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['src', 'node_modules']
	},
	node: {
		fs: 'empty'
	},
};

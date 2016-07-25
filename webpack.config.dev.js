const path = require('path');
const webpack = require('webpack');
const precss = require('precss');

const babelQuery = {
	presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
};

module.exports = {
	context: __dirname,
	entry: {
		app: [path.resolve(__dirname, './src/client/index'), 'webpack-hot-middleware/client'],
	},
	output: {
		path: path.join(__dirname, 'static'),
		filename: '[name].js',
		publicPath: '/static',
		pathinfo: true,
		sourceMapFilename: '[name].map',
	},
	resolve: {
		modulesDirectories: [
			'',
			'src',
			'src/client',
			'src/server',
			'node_modules',
		],
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', query: babelQuery, include: path.join(__dirname, 'src/client') },
			{ test: /\.css$/, loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss' },
		],
	},
	postcss: [
		precss(),
	],
	target: 'web',
	devtool: 'eval-source-map',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
};

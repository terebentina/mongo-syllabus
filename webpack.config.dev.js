var path = require('path');
var webpack = require('webpack');

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
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel', query: babelQuery, include: path.join(__dirname, 'src/client') },
			{ test: /\.scss$/, loader: 'style!css?sourceMap!sass?outputStyle=expanded&sourceMap&sourceMapContents' },
			{ test: /\.css$/, loader: 'style!css?sourceMap' },
		],
	},
	target: 'web',
	devtool: 'eval-source-map',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
};

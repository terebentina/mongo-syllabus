var path = require('path');
var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client';
//var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

var AUTOPREFIXER_PARAMS = 'browsers=last 2 version';

var babelConfig = {
	stage: 0,
	optional: ['runtime'],
	env: {
		development: {
			plugins: ['react-transform'],
			extra: {
				'react-transform': {
					transforms: [{
						transform: 'react-transform-hmr',
						imports: ['react'],
						locals: ['module'],
					}, {
						transform: 'react-transform-catch-errors',
						imports: ['react', 'redbox-react'],
					}],
				},
			},
		},
	},
};

module.exports = {
	context: __dirname,
	entry: {
		app: [path.resolve(__dirname, './src/client/index'), hotMiddlewareScript],
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
			{ test: /\.jsx?$/, loader: 'babel', query: babelConfig, include: path.join(__dirname, 'src/client') },
			{ test: /\.scss$/, loader: 'style!css?sourceMap!autoprefixer?' + AUTOPREFIXER_PARAMS + '!sass?outputStyle=expanded&sourceMap&sourceMapContents' },
			{ test: /\.css$/, loader: 'style!css?sourceMap!autoprefixer?' + AUTOPREFIXER_PARAMS },
		],
	},
	target: 'web',
	//devtool: 'eval',
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
};

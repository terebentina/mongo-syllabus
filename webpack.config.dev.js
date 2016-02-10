var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

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
			{ test: /\.jsx?$/, loader: 'babel', query: babelConfig, include: path.join(__dirname, 'src/client') },
			{ test: /\.scss$/, loader: 'style!css?sourceMap!postcss!sass?outputStyle=expanded&sourceMap&sourceMapContents' },
			{ test: /\.css$/, loader: 'style!css?sourceMap!postcss' },
		],
	},
	postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
	target: 'web',
	devtool: 'eval-source-map',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
};

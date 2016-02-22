const webpack = require('webpack');
const restify = require('restify');
const routes = require('./src/server/config/routes');

const app = restify.createServer({
	name: 'Mongo Syllabus',
	version: '0.0.1',
});

if (process.env.NODE_ENV == 'development') {
	const devConfig = require('./webpack.config.dev');
	const testConfig = require('./webpack.config.test');
	const testsCompiler = webpack(testConfig);

	testsCompiler.watch({}, (err) => {
		if (err) {
			return console.log(err);
		}
		console.log('Test file bundled');
	});

	const compiler = webpack(devConfig);
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: devConfig.output.publicPath,
		stats: { colors: true },
	}));

	app.use(require('webpack-hot-middleware')(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000,
	}));
}

app.use(restify.queryParser());
app.use(restify.bodyParser());
app.use(restify.gzipResponse());
app.use(restify.CORS({
	//origins: ['https://foo.com'],
	credentials: true,
	headers: ['X-Requested-With', 'Content-Type', 'Content-Range', 'Content-Disposition', 'Content-Description', 'P3P'],
}));

routes.call(app);

app.on('after', (req, res/*, route, next*/) => {
	//req.log.info(req.url + ' ' + res.statusCode);
	console.log(new Date(), `${req.method} ${req.url}`, res.statusCode);
});

app.listen(process.env.PORT || 3000, process.env.HOSTNAME || '0.0.0.0', () => {
	console.log('%s listening at %s', app.name, app.url);
});

//process.on('SIGINT', function() {
//	console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
//	// some other closing procedures go here
//	app.close(function() {
//		process.exit(0);
//	});
//});
//
//process.on('SIGTERM', function() {
//	console.log('\nGracefully shutting down from SIGTERM');
//	// some other closing procedures go here
//	app.close(function() {
//		process.exit(0);
//	});
//});

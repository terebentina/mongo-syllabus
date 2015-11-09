const webpack = require('webpack');
const config = require('./webpack.config.dev');
const restify = require('restify');
const routes = require('./src/server/routes');

const app = restify.createServer({
	name: 'Mongo GUI',
	version: '0.0.1',
});

// Start watching and bundling tests here
//const testConfig = require('./webpack.config.test');
//const testsCompiler = webpack(testConfig);

//testsCompiler.watch({}, function(err) {
//	if (err) {
//		return console.log(err);
//	}
//	console.log('Test file bundled');
//});

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000,
}));

//app.use(restify.queryParser());
//app.use(restify.gzipResponse());
//app.use(restify.CORS({
//	//origins: ['https://foo.com'],
//	credentials: true,
//	headers: ['X-Requested-With', 'Content-Type', 'Content-Range', 'Content-Disposition', 'Content-Description', 'P3P'],
//}));

routes.call(app);

app.on('after', function after(req, res/*, route, next*/) {
	//req.log.info(req.url + ' ' + res.statusCode);
	console.log(new Date(), req.method + ' ' + req.url, res.statusCode);
});

app.listen(3000, function listen() {
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

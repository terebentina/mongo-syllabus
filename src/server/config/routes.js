const restify = require('restify');
const path = require('path');
const ejs = require('ejs');

const DatabaseCtrl = require('../controllers/database');
const CollectionCtrl = require('../controllers/collection');
const DocCtrl = require('../controllers/doc');
const mongoServers = require('../../../servers.json');

module.exports = function() {
	this.get('/api/databases', DatabaseCtrl.index);
	this.get('/api/db/:db/stats', DatabaseCtrl.stats);
	this.get('/api/collections/:db', CollectionCtrl.index);
	this.post('/api/collections/:db/:collection', CollectionCtrl.create);
	this.put('/api/collections/:db/:collection', CollectionCtrl.rename);
	this.del('/api/collections/:db/:collection', CollectionCtrl.drop);
	this.get('/api/docs/:db/:collection', DocCtrl.index);
	this.del('/api/docs/:db/:collection/:docId', DocCtrl.remove);
	this.put('/api/docs/:db/:collection/:docId', DocCtrl.update);
	this.post('/api/docs/:db/:collection', DocCtrl.create);

	if (process.env.NODE_ENV == 'development') {
		// restify needs the route defined, even if it won't serve it itself (this is handled by a webpack plugin) otherwise we get a 406 and no chance for the plugin to handle the route
		this.get(/__webpack_hmr/, restify.serveStatic({
			directory: './static',
		}));
	}

	this.get('/', (req, res, next) => {
		const params = {
			styles: [],
			nodeEnv: process.env.NODE_ENV,
			servers: [],
		};
		if (process.env.NODE_ENV != 'development') {
			params.styles = ['/static/app.css'];
		}

		params.servers = mongoServers.map((server, i) => ({ id: i, name: server.name }));

		ejs.renderFile(path.resolve(__dirname, '../views/index.html.ejs'), params, (err, data) => {
			if (err) {
				return next(err);
			}
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(200);
			res.end(data);
			next();
		});
	});

	this.get(/\/static\/?.*/, restify.serveStatic({
		directory: path.join(__dirname, '../../../'),
		default: 'index.html',
	}));
};

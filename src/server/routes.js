const restify = require('restify');
const DatabaseCtrl = require('./controllers/database');
const CollectionCtrl = require('./controllers/collection');
const DocCtrl = require('./controllers/doc');

module.exports = function() {
	this.get('/api/databases', DatabaseCtrl.index);
	this.get('/api/collections/:db', CollectionCtrl.index);
	this.get('/api/docs/:db/:collection', DocCtrl.index);

	this.get(/\/.*/, restify.serveStatic({
		directory: './',
		default: 'index.html',
	}));
};

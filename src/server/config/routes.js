const restify = require('restify');
const DatabaseCtrl = require('./../controllers/database');
const CollectionCtrl = require('./../controllers/collection');
const DocCtrl = require('./../controllers/doc');

module.exports = function() {
	this.get('/api/databases', DatabaseCtrl.index);
	this.get('/api/collections/:db', CollectionCtrl.index);
	this.post('/api/collections/:db/:collection', CollectionCtrl.create);
	this.put('/api/collections/:db/:collection', CollectionCtrl.rename);
	this.del('/api/collections/:db/:collection', CollectionCtrl.drop);
	this.get('/api/docs/:db/:collection', DocCtrl.index);
	this.del('/api/docs/:db/:collection/:docId', DocCtrl.remove);

	this.get(/\/.*/, restify.serveStatic({
		directory: './',
		default: 'index.html',
	}));
};

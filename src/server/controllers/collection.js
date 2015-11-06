//const restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const url = 'mongodb://192.168.55.103:27017';

const CollectionCtrl = {
	index(req, res, next) {
		// warning!!! req.params.db is not sanitized!!! @todo
		const dbUrl = `${url}/${req.params.db}`;
		console.log('dbUrl', dbUrl);
		MongoClient.connect(dbUrl, function(err, db) {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}
			db.listCollections().toArray().then(function(colls) {
				const collections = _.pluck(colls, 'name');
				res.json(collections);
				db.close();
				next();
			}).catch(function(err2) {
				console.log('err', err2.stack);
				next(err2);
			});
		});
	},
};

module.exports = CollectionCtrl;

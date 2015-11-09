//const restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const url = 'mongodb://192.168.55.103:27017';

const DocCtrl = {
	index(req, res, next) {
		// warning!!! req.params.db is not sanitized!!! @todo
		const dbUrl = `${url}/${req.params.db}`;
		MongoClient.connect(dbUrl, function(err, db) {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}
			const collection = db.collection(req.params.collection);

			collection.find({}).skip(0).limit(10).toArray().then(function(docs) {
				console.log('docs', docs);
				res.json(docs);
				db.close();
				next();
			}).catch(function(err2) {
				console.log('err', err2.stack);
				next(err2);
			});
		});
	},
};

module.exports = DocCtrl;

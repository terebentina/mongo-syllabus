'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://192.168.55.103:27017';

const DocCtrl = {
	index(req, res, next) {
		// warning!!! no req.params is sanitized!!! @todo
		const dbName = req.params.db;
		const collectionName = req.params.collection;
		let query = {};
		try {
			if (req.query.query) {
				console.log('req.query.query', req.query.query);
				query = JSON.parse(req.query.query);
			}
		} catch (err) {
			console.log('err', err.stack);
			next(err);
		}

		const skip = parseInt(req.query.skip, 10) || 0;
		const limit = parseInt(req.query.limit, 10) || 30;

		const dbUrl = `${url}/${dbName}`;

		console.log('typeof', typeof query);
		MongoClient.connect(dbUrl, function(err, db) {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}
			const collection = db.collection(collectionName);

			Promise.all([
				collection.find(query).skip(skip).limit(limit).toArray(),
				collection.count(query),
			]).then(function(arr) {
				const json = {
					results: arr[0],
					total: arr[1],
				};
				//if (skip + limit < arr[1]) {
				//	json.next = `/api/docs/${dbName}/${collectionName}?query=${encodeURIComponent(query)}&skip=${skip + limit}`;
				//}
				//if (skip > 0) {
				//	json.prev = `/api/docs/${dbName}/${collectionName}?query=${encodeURIComponent(query)}&skip=${Math.max(0, skip - limit)}`;
				//}
				res.json(json);
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

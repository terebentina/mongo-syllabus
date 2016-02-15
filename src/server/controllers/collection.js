//const restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const restify = require('restify');
const url = 'mongodb://192.168.55.103:27017';

const CollectionCtrl = {
	/**
	 * list all collections in a certain db
	 * @param req
	 * @param res
	 * @param next
	 */
	index(req, res, next) {
		// warning!!! req.params is not sanitized!!! @todo
		const dbUrl = `${url}/${req.params.db}`;
		MongoClient.connect(dbUrl, (err, db) => {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}
			db.listCollections().toArray().then((colls) => {
				const collections = _.map(colls, 'name');
				res.json(collections);
				db.close();
				next();
			}).catch((err2) => {
				db.close();
				console.log('err', err2.stack);
				next(err2);
			});
		});
	},

	/**
	 * create collection
	 * @param req
	 * @param res
	 * @param next
	 */
	create(req, res, next) {
		// warning!!! req.params is not sanitized!!! @todo
		const dbUrl = `${url}/${req.params.db}`;

		const collectionName = req.params.collection.trim();
		if (!collectionName || collectionName.indexOf('$') != -1 || collectionName.indexOf('.') == 0 || collectionName.indexOf('.') == collectionName.length - 1 || collectionName.indexOf('..') != -1) {
			return next(new restify.InvalidContentError('Invalid collection name'));
		}

		MongoClient.connect(dbUrl, (err, db) => {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}

			db.createCollection(collectionName).then(() => {
				db.close();
				res.send(204, '');
				next();
			}).catch((err2) => {
				db.close();
				console.log('err', err2.stack);
				next(err2);
			});
		});
	},

	/**
	 * rename collection
	 * @param req
	 * @param res
	 * @param next
	 */
	rename(req, res, next) {
		// warning!!! req.params is not sanitized!!! @todo
		const dbUrl = `${url}/${req.params.db}`;

		const newCollectionName = req.body.collection.trim();
		if (!newCollectionName || newCollectionName.indexOf('$') != -1 || newCollectionName.indexOf('.') == 0 || newCollectionName.indexOf('.') == newCollectionName.length - 1 || newCollectionName.indexOf('..') != -1) {
			return next(new restify.InvalidContentError('Invalid collection name'));
		}

		MongoClient.connect(dbUrl, (err, db) => {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}

			db.renameCollection(req.params.collection, newCollectionName).then(() => {
				db.close();
				res.send(204, '');
				next();
			}).catch((err2) => {
				db.close();
				console.log('err', err2.stack);
				next(err2);
			});
		});
	},

	/**
	 * drop collection
	 * @param req
	 * @param res
	 * @param next
	 */
	drop(req, res, next) {
		// warning!!! req.params is not sanitized!!! @todo
		const dbUrl = `${url}/${req.params.db}`;

		MongoClient.connect(dbUrl, (err, db) => {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}

			db.dropCollection(req.params.collection).then(() => {
				db.close();
				res.send(204, '');
				next();
			}).catch((err2) => {
				db.close();
				console.log('err', err2.stack);
				next(err2);
			});
		});
	},
};

module.exports = CollectionCtrl;

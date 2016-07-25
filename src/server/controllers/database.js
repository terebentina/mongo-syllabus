//const restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');

// yes, I know, this is hardcoded. Just for now @todo
const url = 'mongodb://192.168.5.105:27017';

const DatabaseCtrl = {
	index(req, res, next) {
		// Use connect method to connect to the Server
		MongoClient.connect(url, (err, db) => {
			if (err) {
				console.log('err', err.stack);
				return next(err);
			}
			const adminDb = db.admin();
			adminDb.listDatabases().then((dbs) => {
				res.json(_.map(dbs.databases, 'name'));
				db.close();
				next();
			}).catch((err2) => {
				console.log('err', err2.stack);
				next(err2);
			});
		});
	},
};

module.exports = DatabaseCtrl;

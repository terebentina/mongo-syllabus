const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

// @todo remove
// const url = 'mongodb://192.168.5.105:27017';
const url = 'mongodb://127.0.0.1:27017';

const DocCtrl = {
  index(req, res, next) {
    // warning!!! req.params are not sanitized!!! @todo
    const dbName = req.params.db;
    const collectionName = req.params.collection;
    let query = {};
    try {
      if (req.query.query) {
        query = JSON.parse(req.query.query);
      }
    } catch (err) {
      console.log('err', err.stack);
      return next(err);
    }

    const p = parseInt(req.query.p, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 30;

    const dbUrl = `${url}/${dbName}`;

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) {
        console.log('err', err.stack);
        return next(err);
      }
      const collection = db.collection(collectionName);

      Promise.all([
        collection.find(query).skip(p * limit).limit(limit).toArray(),
        collection.count(query),
      ]).then((arr) => {
        const json = {
          results: arr[0], total: arr[1],
        };
        //if (skip + limit < arr[1]) {
        //  json.next = `/api/docs/${dbName}/${collectionName}?query=${encodeURIComponent(query)}&skip=${skip + limit}`;
        //}
        //if (skip > 0) {
        //  json.prev = `/api/docs/${dbName}/${collectionName}?query=${encodeURIComponent(query)}&skip=${Math.max(0, skip - limit)}`;
        //}
        db.close();
        res.json(json);
        next();
      }).catch((err2) => {
        db.close();
        console.log('err', err2.stack);
        next(err2);
      });
    });
  },

  create(req, res, next) {
    // warning!!! req.params are not sanitized!!! @todo
    const dbUrl = `${url}/${req.params.db}`;

    let doc;
    try {
      doc = JSON.parse(req.body.doc);
    } catch (err) {
      console.log('err', err.stack);
      return next(err);
    }

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) {
        console.log('err', err.stack);
        return next(err);
      }
      const collection = db.collection(req.params.collection);

      collection.insertOne(doc)
        .then((result) => {
          console.log('result', result);
          db.close();
          res.json(result);
          next();
        }).catch((err2) => {
          db.close();
          console.log('err', err2.stack);
          next(err2);
        });
    });
  },

  update(req, res, next) {
    // warning!!! req.params are not sanitized!!! @todo
    const dbUrl = `${url}/${req.params.db}`;
    const id = req.params.docId;

    let doc;
    try {
      doc = JSON.parse(req.body.doc);
    } catch (err) {
      console.log('err', err.stack);
      return next(err);
    }

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) {
        console.log('err', err.stack);
        return next(err);
      }
      const collection = db.collection(req.params.collection);

      // can't update the _id
      delete doc._id;

      collection.findOneAndUpdate({ _id: new ObjectId(id) }, doc, { returnOriginal: false })
        .then((result) => {
          console.log('result', result);
          db.close();
          res.json(result.value);
          next();
        }).catch((err2) => {
          db.close();
          console.log('err', err2.stack);
          next(err2);
        });
    });
  },

  remove(req, res, next) {
    // warning!!! req.params are not sanitized!!! @todo
    const dbUrl = `${url}/${req.params.db}`;
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) {
        console.log('err', err.stack);
        return next(err);
      }
      const collection = db.collection(req.params.collection);
      collection.findOneAndDelete({ _id: new ObjectId(req.params.docId) }).then((/*result*/) => {
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

module.exports = DocCtrl;

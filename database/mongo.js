var mongo  = require("mongodb");
var MongoClient = mongo.MongoClient;

var db;

var DB_URL = "mongodb://127.0.0.1:27017/issuesdb"

if (process.env.MONGODB_URI) {
  DB_URL = MONGODB_URI
}

/**
 * CONNECTION to DATABASE
 */

exports.init = function(cb){
  console.log("Connecting to MongoDB...");
  MongoClient.connect(DB_URL, 
    function(err, dbinstance) {
      if (err){
        cb(err,0);
      } else {
        db = dbinstance.db("issuesdb");
        cb(0,dbinstance.db("issuesdb"));
      }
  });
};


/** 
 * CALLS TO DATABASE 
 */

exports.findAll = function( collection, cb) {
  db.collection(collection, function(err,collection) {
    collection.find({},{}).toArray(cb);
  })
}


exports.updateTitle = function(collection, id, text, cb) {
  db.collection(collection, function(err, collection) {
    collection.updateOne({"_id": id}, {$set: {title: text}}, {}, cb)
  })
}

exports.updateDescription = function(collection, id, text, cb) {
  db.collection(collection, function(err, collection) {
    collection.updateOne({"_id": id}, {$set: {description: text}}, {}, cb)
  })
}

exports.updateSeverity = function(collection, id, text, cb) {
  db.collection(collection, function(err, collection) {
    collection.updateOne({"_id": id}, {$set: {severity: text}}, {}, cb)
  })
}

exports.updateStatus = function(collection, id, text, cb) {
  db.collection(collection, function(err, collection) {
    collection.updateOne({"_id": id}, {$set: {status:text}}, {}, cb)
  })
}

exports.insert = function(collection, data, cb) {
  db.collection(collection, function(err, collection) {
    collection.insert(data, cb)
  })
}

exports.deleteByID = function(collection, id, cb) {
  db.collection(collection, function(err, collection) {
    collection.deleteOne({"_id": id}, cb)
  })
}

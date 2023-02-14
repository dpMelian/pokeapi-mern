import { MongoClient } from "mongodb";
const database = "mongodb://localhost:27017/pokeapi-db";
const client = new MongoClient(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

export const connectToServer = (callback) => {
  client.connect(function (err, db) {
    // Verify we got a good "db" object
    if (db) {
      _db = db.db("trainer");
      console.log("Successfully connected to MongoDB.");
    }
    return callback(err);
  });
};

export const getDb = () => {
  return _db;
};

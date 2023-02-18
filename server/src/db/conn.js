import mongoose from "mongoose"
const database = "mongodb://127.0.0.1:27017/pokeapi-db"

var _db

export const connectToServer = () => {
  mongoose
    .connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err))
}

export const getDb = () => {
  return _db
}

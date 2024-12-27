import mongoose from "mongoose"
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`

var _db

export const connectToServer = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err))
}

export const getDb = () => {
  return _db
}

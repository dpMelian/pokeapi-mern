import express from "express"

// trainerRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /trainer.
const trainerRoutes = express.Router()

// This will help us connect to the database
import { getDb } from "../db/conn.js"

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb"

// This section will help you get a list of all the trainers.
trainerRoutes.route("/trainer").get(function (req, res) {
  let db_connect = getDb()
  db_connect
    .collection("trainer")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})

// This section will help you get a single trainer by id
trainerRoutes.route("/trainer/:id").get(function (req, res) {
  let db_connect = getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection("trainer").findOne(myquery, function (err, result) {
    if (err) throw err
    res.json(result)
  })
})

// This section will help you create a new trainer.
trainerRoutes.route("/trainer/add").post(function (req, response) {
  let db_connect = getDb()

  console.log(req.body)
  let myobj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  db_connect.collection("trainer").insertOne(myobj, function (err, res) {
    if (err) throw err
    response.json(res)
  })
})

// This section will help you update a trainer by id.
trainerRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  }
  db_connect
    .collection("trainer")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err
      console.log("1 trainer updated")
      response.json(res)
    })
})

// This section will help you delete a trainer
trainerRoutes.route("/:id").delete((req, response) => {
  let db_connect = getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection("trainer").deleteOne(myquery, function (err, obj) {
    if (err) throw err
    console.log("1 trainer deleted")
    response.json(obj)
  })
})

export default trainerRoutes

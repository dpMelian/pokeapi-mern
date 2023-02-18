import express from "express"
import Trainer from "../models/Trainer.js"

// trainerRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /trainer.
const trainerRoutes = express.Router()

// This section will help you create a new trainer.
trainerRoutes.route("/trainer/add").post(function (req, res) {
  const newTrainer = new Trainer(req.body)
  newTrainer.save(function (err, trainer) {
    if (err) throw err
    res.json(trainer)
  })
})

export default trainerRoutes

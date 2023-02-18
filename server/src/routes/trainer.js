import express from "express"
import Trainer from "../models/Trainer.js"

const trainerRoutes = express.Router()

trainerRoutes.route("/trainer/add").post(function (req, res) {
  const newTrainer = new Trainer(req.body)
  newTrainer.save(function (err, trainer) {
    if (err) throw err
    res.json(trainer)
  })
})

trainerRoutes.route("/trainer/login").post(function (req, res) {
  const { email, password } = req.body
  Trainer.findOne({ email: email }, function (err, trainer) {
    if (!trainer) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    trainer.comparePassword(password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" })
      }

      return res.json(trainer)
    })
  })
})

export default trainerRoutes

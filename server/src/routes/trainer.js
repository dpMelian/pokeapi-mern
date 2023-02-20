import express from "express"
import jsonwebtoken from "jsonwebtoken"
import Trainer from "../models/Trainer.js"

const trainerRoutes = express.Router()
const SECRET_JWT_CODE = process.env.SECRET_JWT_CODE

const blacklistedTokens = new Set()

trainerRoutes.route("/trainer/add").post(function (req, res) {
  const { name, email, password } = req.body
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be 8 or more characters" })
  }
  const newTrainer = new Trainer({ name, email, password })
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

      const token = jsonwebtoken.sign(
        { id: trainer._id, email: trainer.email },
        SECRET_JWT_CODE
      )
      return res.json({ success: true, token: token })
    })
  })
})

trainerRoutes.use(checkTokenBlacklist, (req, res, next) => {
  if (req.path !== "/trainer/login" && req.path !== "/trainer/sign-up") {
    next()
  }
})

trainerRoutes.get("/trainer/name", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  jsonwebtoken.verify(token, SECRET_JWT_CODE, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" })
    }

    try {
      const trainer = await Trainer.findById(decodedToken.id)
      const name = trainer.name
      res.json({ name })
    } catch (err) {
      console.error(err)
      res.status(500).send("Server Error")
    }
  })
})

trainerRoutes.delete("/trainer/logout", function (req, res) {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  blacklistedTokens.add(token)

  return res.json({ success: true })
})

function checkTokenBlacklist(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token has been revoked" })
  }

  next()
}

export default trainerRoutes

import express from "express"
import cors from "cors"
import { connectToServer } from "./db/conn.js"
import trainerRoutes from "./routes/trainer.js"

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(trainerRoutes)

app.listen(port, () => {
  connectToServer(function (err) {
    if (err) console.error(err)
  })
  console.log(`Server is running on port: ${port}`)
})

import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

const schema = Schema(
  {
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "trainer" }
)

schema.pre("save", async function () {
  const trainer = this
  if (!trainer.isModified("password")) {
    return
  }

  const hashedPassword = await bcrypt.hash(trainer.password, 10)
  trainer.password = hashedPassword
})

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }

    cb(null, isMatch)
  })
}

const Trainer = model("Trainer", schema)

export default Trainer

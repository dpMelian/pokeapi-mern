import { model, Schema } from "mongoose"

const schema = Schema(
  {
    trainer: { type: Schema.Types.ObjectId, ref: "Trainer", required: true },
    pokemon: { type: Number, required: true },
  },
  { collection: "favorite" }
)

const Favorite = model("Favorite", schema)

const addFavorite = async (trainer, pokemonId) => {
  const filter = { trainer: trainer }
  const update = { pokemon: pokemonId }
  const options = { upsert: true, new: true }

  return Favorite.findOneAndUpdate(filter, update, options)
}

export default addFavorite

export const getFavorite = async (trainerId) =>
  await Favorite.findOne({ trainer: trainerId })

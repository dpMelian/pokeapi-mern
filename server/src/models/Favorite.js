import { model, Schema, Types } from "mongoose"

const schema = Schema(
  {
    trainer: { type: Schema.Types.ObjectId, ref: "Trainer", required: true },
    pokemon: { type: Schema.Types.ObjectId, ref: "Pokemon", required: true },
  },
  { collection: "favorite" }
)

const Favorite = model("Favorite", schema)

const addFavorite = async (trainer, pokemonId) => {
  const favorite = new Favorite({
    trainer,
    pokemon: Types.ObjectId(pokemonId),
  })
  return favorite.save()
}

export default addFavorite

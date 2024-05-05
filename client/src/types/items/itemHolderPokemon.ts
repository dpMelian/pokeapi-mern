// Reference - https://pokeapi.co/docs/v2#itemholderpokemon

import { NamedAPIResource } from "../utility/commonModels"
import { ItemHolderPokemonVersionDetail } from "./itemHolderPokemonVersionDetail"

export type ItemHolderPokemon = {
  pokemon: NamedAPIResource
  version_details: ItemHolderPokemonVersionDetail[]
}

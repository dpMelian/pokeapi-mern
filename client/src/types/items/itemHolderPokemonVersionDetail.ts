// Reference - https://pokeapi.co/docs/v2#itemholderpokemonversiondetail

import { NamedAPIResource } from "../utility/commonModels"

export type ItemHolderPokemonVersionDetail = {
  rarity: number
  version: NamedAPIResource
}

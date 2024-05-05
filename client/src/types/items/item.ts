import {
  APIResource,
  GenerationGameIndex,
  MachineVersionDetail,
  Name,
  NamedAPIResource,
  VerboseEffect,
  VersionGroupFlavorText,
} from "../utility/commonModels"
import { ItemHolderPokemon } from "./itemHolderPokemon"
import { ItemSprites } from "./itemSprites"

// Reference - https://pokeapi.co/docs/v2#items-section
export type Item = {
  id: number
  name: string
  cost: number
  fling_power: number
  fling_effect: NamedAPIResource
  attributes: NamedAPIResource[]
  category: NamedAPIResource
  effect_entries: VerboseEffect[]
  flavor_text_entries: VersionGroupFlavorText[]
  game_indices: GenerationGameIndex[]
  names: Name[]
  sprites: ItemSprites
  held_by_pokemon: ItemHolderPokemon[]
  baby_trigger_for: APIResource
  machines: MachineVersionDetail[]
}

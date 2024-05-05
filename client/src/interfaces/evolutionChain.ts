import { NamedAPIResource } from "@/types/utility/commonModels"

export type EvolutionDetails = {
  item: NamedAPIResource
  trigger: NamedAPIResource
  gender: number
  held_item: NamedAPIResource
  known_move: NamedAPIResource
  known_move_type: NamedAPIResource
  location: NamedAPIResource
  min_level: number
  min_happiness: number
  min_beauty: number
  min_affection: number
  needs_overworld_rain: boolean
  party_species: NamedAPIResource
  party_type: NamedAPIResource
  relative_physical_stats: number
  time_of_day: string
  trade_species: NamedAPIResource
  turn_upside_down: boolean
}

export type Chain = {
  is_baby: boolean
  species: NamedAPIResource
  evolution_details: EvolutionDetails[]
  evolves_to: Chain[]
}

export type EvolutionChain = {
  baby_trigger_item: NamedAPIResource | null
  id: number
  chain: Chain
}

type PokemonSpeciesVariety = {
  is_default: boolean
  pokemon: {
    name: string
    url: string
  }
}

export type PokemonSpecies = {
  id: number
  evolution_chain: { url: string }
  name: string
  names: Array<{ language: { name: string; url: string }; name: string }>
  order: number
  gender_rate: number
  capture_rate: number
  base_happiness: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  hatch_counter: number
  has_gender_differences: boolean
  forms_switchable: boolean
  varieties: PokemonSpeciesVariety[]
}

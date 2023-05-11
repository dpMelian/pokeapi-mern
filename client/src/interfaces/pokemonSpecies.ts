export interface PokemonSpecies {
  evolution_chain: { url: string }
  names: Array<{ language: { name: string; url: string }; name: string }>
}

export interface Chain {
  evolves_to: Chain[]
  species: {
    name: string
  }
}

export interface EvolutionChain {
  chain: {
    evolves_to: Array<{
      evolves_to: Array<{
        species: {
          name: string
        }
      }>
      species: {
        name: string
      }
    }>
    species: {
      name: string
    }
  }
}

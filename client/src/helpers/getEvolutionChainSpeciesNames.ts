import { type Chain } from "../types/evolution/evolutionChain"

const getEvolutionChainSpeciesNames = (
  evolutionChain: Chain,
  evolutionChainSpeciesNames: string[],
  evolutionChainSpeciesURLs: string[],
) => {
  evolutionChainSpeciesNames.push(evolutionChain.species.name)
  evolutionChainSpeciesURLs.push(evolutionChain.species.url)

  evolutionChain.evolves_to.forEach((evolvesTo) => {
    getEvolutionChainSpeciesNames(
      evolvesTo,
      evolutionChainSpeciesNames,
      evolutionChainSpeciesURLs,
    )
  })
  return {
    evolutionChainSpeciesNames,
    evolutionChainSpeciesURLs,
  }
}

export default getEvolutionChainSpeciesNames

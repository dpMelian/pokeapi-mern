import { type Chain } from "../interfaces/evolutionChain"

const getEvolutionChainSpeciesNames = (
  evolutionChain: Chain,
  evolutionChainSpeciesNames: string[]
): string[] => {
  evolutionChainSpeciesNames.push(evolutionChain.species.name)

  evolutionChain.evolves_to.forEach((evolvesTo) => {
    getEvolutionChainSpeciesNames(evolvesTo, evolutionChainSpeciesNames)
  })
  return evolutionChainSpeciesNames
}

export default getEvolutionChainSpeciesNames

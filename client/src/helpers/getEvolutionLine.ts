import { Chain, EvolutionDetails } from "@/interfaces/evolutionChain"

type EvolutionLineElement = {
  name: string
  details: EvolutionDetails[] | null
  next?: Chain[]
  level: number
}

/**
 * @param {Chain|Chain[]} object.chain - The object (or array of objects) containing the evolution line
 * @param {number} object.currentLevel - Current depth in the evolution line
 * @param {EvolutionLineElement[]} object.res - The current result, in order to allow recursion
 * @returns A plain array containing the name, details, depth level and the following (next) pokémon in the line
 */
export const getEvolutionLine = ({
  chain,
  currentLevel,
  res,
}: {
  chain: Chain | Chain[]
  currentLevel: number
  res: EvolutionLineElement[]
}) => {
  if (!chain) return

  if (currentLevel === 0) {
    res.push({
      name: (chain as Chain).species.name,
      details: null,
      next: (chain as Chain).evolves_to,
      level: currentLevel,
    })

    getEvolutionLine({
      chain: (chain as Chain).evolves_to,
      currentLevel: currentLevel + 1,
      res: res,
    })
  } else {
    // Rationale for following semicolon: https://prettier.io/docs/en/rationale.html#semicolons
    ;(chain as Chain[]).forEach((evolution) => {
      res.push({
        name: evolution.species.name,
        details: evolution.evolution_details,
        next: evolution.evolves_to,
        level: currentLevel,
      })
      getEvolutionLine({
        chain: evolution.evolves_to,
        res: res,
        currentLevel: currentLevel + 1,
      })
    })
  }

  return res
}

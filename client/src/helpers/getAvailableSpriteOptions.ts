import { firstLetterToUpperCase } from "./firstLetterToUpperCase"
import { POKEMON_GENERATION_RANGES } from "../constants/pokemonGenerations"

const getAvailableSpriteOptions = (
  availableVersions: Record<
    string,
    Record<
      string,
      {
        front_default: string
      }
    >
  >
): {
  firstAvailableGeneration: string
  spriteOptions: Array<{ value: string; label: string }>
} => {
  let firstAvailableGeneration = ""
  const spriteOptions: Array<{ value: string; label: string }> = []

  for (const [generation, versions] of Object.entries(availableVersions)) {
    const { front_default: frontDefault } =
      versions[POKEMON_GENERATION_RANGES[generation].version]

    if (frontDefault !== null) {
      if (firstAvailableGeneration.length === 0) {
        firstAvailableGeneration = generation
      }

      spriteOptions.push({
        value: generation,
        label: firstLetterToUpperCase(generation),
      })
    }
  }

  return { firstAvailableGeneration, spriteOptions }
}

export default getAvailableSpriteOptions

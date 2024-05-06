import { entries } from "@/types/keyValueType"
import { EvolutionDetails } from "@/types/evolution/evolutionChain"

export const getEvolutionDetails = (
  evolutionDetails: EvolutionDetails[] | null | undefined,
) => {
  if (!evolutionDetails) return

  const result: Partial<EvolutionDetails> = {}

  evolutionDetails.forEach((evolutionDetail) => {
    for (const [key, value] of entries(evolutionDetail)) {
      if (value !== null && value !== "" && value !== false) {
        result[key] = value
      }
    }
  })

  return result
}

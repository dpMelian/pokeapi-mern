import axios from "axios"
import { useQuery } from "react-query"

type Language = {
  name: string
  url: string
}

type VersionGroup = {
  name: string
  url: string
}

type FlavorTextEntry = {
  flavor_text: string
  language: Language
  version_group: VersionGroup
}

type EffectEntry = {
  effect: string
  language: Language
  short_effect: string
}

type Generation = {
  name: string
  url: string
}

type Ability = {
  effect_changes: any[]
  effect_entries: EffectEntry[]
  flavor_text_entries: FlavorTextEntry[]
  generation: Generation
  id: number
}

export const useGetAbilityDetails = (url: string) => {
  return useQuery(
    ["get-ability-details", url],
    async () => await axios.get(`${url}`),
    {
      select: (data) => data.data as Ability,
    },
  )
}

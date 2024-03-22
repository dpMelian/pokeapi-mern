import axios from "axios"
import { useQuery } from "react-query"
import { POKE_API_BASE_URL } from "../constants/baseUrls"
import { PokemonSpecies } from "@/types/pokemonSpecies"

const useGetPokemonSpecies = (identifier: string | number) => {
  const { data, isLoading, isError } = useQuery<PokemonSpecies, Error>(
    ["getPokemonSpecies", identifier],
    async () => {
      const response = await axios.get<PokemonSpecies>(
        `${POKE_API_BASE_URL}/pokemon-species/${identifier}`,
      )
      return response.data
    },
  )

  return { data, isLoading, isError }
}

export default useGetPokemonSpecies

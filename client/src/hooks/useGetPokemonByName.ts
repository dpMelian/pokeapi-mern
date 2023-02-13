import axios from "axios"
import { useQuery } from "react-query"
import { POKE_API_BASE_URL } from "../constants/baseUrls"

export const useGetPokemonByName = (name: string) =>
  useQuery(
    ["getPokemonByName", name],
    async () => await axios.get(`${POKE_API_BASE_URL}/pokemon/${name}`),
    { select: (data) => data.data }
  )

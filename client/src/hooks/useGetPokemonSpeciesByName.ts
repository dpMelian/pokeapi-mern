import axios, { type AxiosResponse } from "axios"
import { useQuery, type UseQueryResult } from "react-query"
import { POKE_API_BASE_URL } from "../constants/baseUrls"

const useGetPokemonSpeciesByName = (
  name: string | number
): UseQueryResult<AxiosResponse<any, unknown>> =>
  useQuery(
    ["getPokemonSpeciesByName", name],
    async () => await axios.get(`${POKE_API_BASE_URL}/pokemon-species/${name}`),
    { select: (data) => data.data }
  )

export default useGetPokemonSpeciesByName

import axios, { type AxiosResponse } from "axios"
import { useQuery, type UseQueryResult } from "react-query"
import { POKE_API_BASE_URL } from "../constants/baseUrls"

export const useGetPokemonByName = (
  name: string | number
): UseQueryResult<AxiosResponse<any, unknown>> =>
  useQuery(
    ["getPokemonByName", name],
    async () => await axios.get(`${POKE_API_BASE_URL}/pokemon/${name}`),
    { select: (data) => data.data }
  )

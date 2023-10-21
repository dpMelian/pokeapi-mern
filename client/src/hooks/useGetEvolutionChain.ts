import axios, { type AxiosResponse } from "axios"
import { useQuery, type UseQueryResult } from "react-query"

export const useGetEvolutionChain = (
  url: string,
): UseQueryResult<AxiosResponse<any, unknown>> =>
  useQuery(["getEvolutionChain", url], async () => await axios.get(`${url}`), {
    select: (data) => data.data,
  })

export default useGetEvolutionChain

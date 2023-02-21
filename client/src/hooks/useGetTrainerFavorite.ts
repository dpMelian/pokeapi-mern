import axios, { type AxiosResponse } from "axios"
import { useQuery, type UseQueryResult } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useGetTrainerFavorite = (): UseQueryResult<
  AxiosResponse<any, unknown>
> => {
  const token = localStorage.getItem("token")
  return useQuery(
    "getTrainerFavorite",
    async () => {
      if (token === null) {
        throw new Error("No token provided")
      }

      const response = await api.get("/trainer/favorite/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { pokemonId } = await response.data
      return pokemonId
    },
    { enabled: token !== null }
  )
}

export default useGetTrainerFavorite

import axios, { type AxiosResponse } from "axios"
import { useQuery, type UseQueryResult } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useGetLoggedTrainerName = (): UseQueryResult<
  AxiosResponse<any, unknown>
> => {
  const token = localStorage.getItem("token")
  return useQuery(
    "getTrainerName",
    async () => {
      if (token === null) {
        throw new Error("No token provided")
      }

      const response = await api.get("/trainer/name", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { name } = await response.data
      return name
    },
    { enabled: token !== null }
  )
}

export default useGetLoggedTrainerName

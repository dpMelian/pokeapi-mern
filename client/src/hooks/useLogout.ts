import axios, { type AxiosResponse } from "axios"
import { useMutation, type UseMutationResult } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useLogout = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  string | null,
  unknown
> =>
  useMutation(async (token) => {
    if (token === null) {
      throw new Error("No token provided")
    }
    const response = await api.delete("/trainer/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  })

export default useLogout

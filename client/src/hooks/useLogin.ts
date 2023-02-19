import axios, { type AxiosResponse } from "axios"
import { useMutation, type UseMutationResult } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useLogin = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  { email: string; password: string },
  unknown
> =>
  useMutation(
    async (data: { email: string; password: string }) =>
      await api.post("/trainer/login", data)
  )

export default useLogin

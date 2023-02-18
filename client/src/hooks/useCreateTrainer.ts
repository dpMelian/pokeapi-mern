import axios, { type AxiosResponse } from "axios"
import { useMutation, type UseMutationResult } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useCreateTrainer = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  { name: string; email: string; password: string },
  unknown
> =>
  useMutation(
    async (data: { name: string; email: string; password: string }) =>
      await api.post("/trainer/add", data),
    {
      onSuccess: (response) => {
        console.log(response)
      },
    }
  )

export default useCreateTrainer

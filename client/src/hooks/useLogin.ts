import axios from "axios"
import { useMutation } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useLogin = () => {
  return useMutation(async (data: { email: string; password: string }) => {
    await api.post("/trainer/login", data)
  })
}

export default useLogin

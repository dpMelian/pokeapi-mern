import axios from "axios"
import { useMutation } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useCreateTrainer = () =>
  useMutation(async (data) => await api.post("/trainer/add", data), {
    onSuccess: (response) => {
      console.log(response)
    },
  })

export default useCreateTrainer

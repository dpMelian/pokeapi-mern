import axios, { type AxiosResponse } from "axios"
import { useMutation, type UseMutationResult } from "react-query"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

const useAddFavoritePokemon = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  number,
  unknown
> =>
  useMutation(async (pokemonId: number) => {
    const token = localStorage.getItem("token")
    if (token === null) {
      throw new Error("No token provided")
    }
    return await api.post(
      "/trainer/favorite",
      { pokemonId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  })

export default useAddFavoritePokemon

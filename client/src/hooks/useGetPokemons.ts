import axios from "axios"
import { useQuery } from "react-query"
import { POKE_API_BASE_URL } from "../constants/baseUrls"
import { useMemo } from "react"

const useGetPokemons = (identifiers: string[] | number[]) => {
  const { data, status } = useQuery(["getPokemons", identifiers], async () => {
    const response = await Promise.all(
      identifiers.map(async (identifier) => {
        const response = await axios.get(
          `${POKE_API_BASE_URL}/pokemon/${identifier}`,
        )

        return response
      }),
    )

    return response.map((res) => res.data)
  })

  const isLoading = useMemo(() => status === "loading", [status])

  return { data, isLoading }
}

export default useGetPokemons

import { useMemo } from "react"
import { useQuery } from "react-query"
import axios from "axios"

import { POKE_API_BASE_URL } from "../constants/baseUrls"
import { Pokemon } from "@/types/pokemon/pokemon"

const useGetPokemons = (identifiers: string[] | number[]) => {
  const { data, status } = useQuery(["getPokemons", identifiers], async () => {
    const response = await Promise.all(
      identifiers.map(async (identifier) => {
        const response = await axios.get<Pokemon>(
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

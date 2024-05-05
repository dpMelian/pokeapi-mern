import axios from "axios"
import { useQuery } from "react-query"
import { POKE_API_BASE_URL } from "../constants/baseUrls"
import { useMemo } from "react"
import { Item } from "@/types/items/item"

const useGetItem = (identifier: string | number) => {
  const { data, status } = useQuery(["getItem", identifier], async () => {
    const response = await axios.get(`${POKE_API_BASE_URL}/item/${identifier}`)

    return response.data as Item
  })

  const isLoading = useMemo(() => status === "loading", [status])

  return { data, isLoading }
}

export default useGetItem

import { useEffect, useState } from "react"

import { PokemonSpecies } from "@/types/pokemon/pokemonSpecies"
import { Skeleton } from "./ui/skeleton"
import { type Pokemon } from "../interfaces/pokemon"
import useGetPokemons from "@/hooks/useGetPokemons"
import useGetPokemonSpecies from "@/hooks/useGetPokemonSpecies"

interface Props {
  identifier: string
}

const LoadAndRenderImage = ({ identifier }: Props) => {
  const [artworkImage, setArtworkImage] = useState("")
  const { data: pokemonSpecies, isLoading: isPokemonSpeciesLoading } =
    useGetPokemonSpecies(identifier) as unknown as {
      data: PokemonSpecies
      isLoading: boolean
      isError: boolean
    }

  const { data: pokemons, isLoading: isPokemonsLoading } = useGetPokemons(
    pokemonSpecies?.varieties.map(({ pokemon }) => pokemon.name) ?? [],
  ) as unknown as { data: Pokemon[]; isLoading: boolean }

  useEffect(() => {
    if (!pokemons) return

    if (pokemons[0]?.sprites?.other["official-artwork"].front_default != null) {
      setArtworkImage(
        pokemons[0]?.sprites.other["official-artwork"].front_default,
      )
    } else {
      setArtworkImage(pokemons[0]?.sprites?.other.dream_world.front_default)
    }
  }, [pokemons])

  return (
    <>
      {(isPokemonSpeciesLoading || isPokemonsLoading) && (
        <Skeleton className="size-[150px]" />
      )}
      {!(isPokemonSpeciesLoading || isPokemonsLoading) && (
        <img
          className="h-[150px] w-[150px] object-contain"
          src={artworkImage}
          alt={`artwork image of pokémon ${identifier}`}
        />
      )}
    </>
  )
}

export default LoadAndRenderImage

import { useEffect, useState } from "react"
import Skeleton from "@mui/material/Skeleton"

import useGetPokemons from "@/hooks/useGetPokemons"
import { type Pokemon } from "../interfaces/pokemon"

interface Props {
  name: string
}

const LoadAndRenderImage = ({ name }: Props): JSX.Element => {
  const [artworkImage, setArtworkImage] = useState("")
  const { data: pokemon, isLoading } = useGetPokemons([name]) as unknown as {
    data: Pokemon
    isLoading: boolean
  }

  useEffect(() => {
    if (!pokemon) return

    if (pokemon.sprites?.other["official-artwork"].front_default != null) {
      setArtworkImage(pokemon.sprites.other["official-artwork"].front_default)
    } else {
      setArtworkImage(pokemon.sprites?.other.dream_world.front_default)
    }
  }, [pokemon])

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          height={"150px"}
          width={"150px"}
          animation="wave"
        />
      )}
      {!isLoading && (
        <img
          className="h-[150px] w-[150px] object-contain"
          src={artworkImage}
          alt={`artwork image of pokémon ${name}`}
        />
      )}
    </>
  )
}

export default LoadAndRenderImage

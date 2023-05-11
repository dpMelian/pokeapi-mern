import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useGetPokemonByName } from "../hooks/useGetPokemonByName"
import { type Pokemon } from "../interfaces/pokemon"
import { Skeleton } from "@mui/material"

interface Props {
  name: string
}

const Image = styled.img`
  height: 150px;
  width: 150px;
  object-fit: contain;
`

const LoadAndRenderImage = ({ name }: Props): JSX.Element => {
  const [artworkImage, setArtworkImage] = useState("")
  const { data: pokemon, isLoading } = useGetPokemonByName(name) as unknown as {
    data: Pokemon
    isLoading: boolean
  }

  useEffect(() => {
    if (pokemon == null) return

    if (pokemon.sprites.other.dream_world.front_default != null) {
      setArtworkImage(pokemon.sprites.other.dream_world.front_default)
    } else {
      setArtworkImage(pokemon.sprites.other["official-artwork"].front_default)
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
        <a href={artworkImage} target="_blank" rel="noreferrer">
          <Image src={artworkImage} alt={`artwork image of pokémon ${name}`} />
        </a>
      )}
    </>
  )
}

export default LoadAndRenderImage

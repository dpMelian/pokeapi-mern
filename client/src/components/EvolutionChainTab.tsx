import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { type PokemonSpecies } from "../interfaces/pokemonSpecies"
import { type Chain, type EvolutionChain } from "../interfaces/evolutionChain"
import useGetEvolutionChain from "../hooks/useGetEvolutionChain"
import getEvolutionChainSpeciesNames from "../helpers/getEvolutionChainSpeciesNames"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"
import LoadAndRenderImage from "./LoadAndRenderImage"

interface Props {
  pokemonSpecies: PokemonSpecies
}

const EvolutionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const EvolutionItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const EvolutionChainTab = ({ pokemonSpecies }: Props): JSX.Element => {
  const { data: evolutionChain, isLoading } = useGetEvolutionChain(
    pokemonSpecies?.evolution_chain.url
  ) as unknown as { data: EvolutionChain; isLoading: boolean }

  const [evolutionChainSpeciesNames, setEvolutionChainSpeciesNames] = useState(
    [] as string[]
  )

  useEffect(() => {
    if (evolutionChain?.chain.species.name.length > 0) {
      const { chain } = evolutionChain as unknown as { chain: Chain }
      const evolutionChainSpeciesNames = getEvolutionChainSpeciesNames(
        chain,
        []
      )
      setEvolutionChainSpeciesNames(evolutionChainSpeciesNames)
    }
  }, [evolutionChain])

  return (
    <>
      {!isLoading && evolutionChainSpeciesNames.length <= 1 && (
        <p>This pokémon has no evolutions</p>
      )}
      {evolutionChainSpeciesNames.length > 1 && (
        <EvolutionContainer>
          {evolutionChainSpeciesNames.map((elem, index) => (
            <EvolutionItem key={index}>
              <LoadAndRenderImage name={elem} />
              <p>{firstLetterToUpperCase(elem)}</p>
            </EvolutionItem>
          ))}
        </EvolutionContainer>
      )}
    </>
  )
}

export default EvolutionChainTab

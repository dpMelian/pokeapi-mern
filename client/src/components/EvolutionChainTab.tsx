import React, { useEffect, useState } from "react"

import getEvolutionChainSpeciesNames from "../helpers/getEvolutionChainSpeciesNames"
import LoadAndRenderImage from "./LoadAndRenderImage"
import useGetEvolutionChain from "../hooks/useGetEvolutionChain"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"
import { type Chain, type EvolutionChain } from "../interfaces/evolutionChain"
import { PokemonSpecies } from "@/types/pokemonSpecies"

interface Props {
  pokemonSpecies: PokemonSpecies
  setSearchValue: React.Dispatch<React.SetStateAction<string | number>>
}

const EvolutionChainTab = ({
  pokemonSpecies,
  setSearchValue,
}: Props): JSX.Element => {
  const { data: evolutionChain, isLoading } = useGetEvolutionChain(
    pokemonSpecies?.evolution_chain.url,
  ) as unknown as { data: EvolutionChain; isLoading: boolean }

  const [evolutionChainSpeciesNames, setEvolutionChainSpeciesNames] = useState(
    [] as string[],
  )

  useEffect(() => {
    if (evolutionChain?.chain.species.name.length > 0) {
      const { chain } = evolutionChain as unknown as { chain: Chain }
      const evolutionChainSpeciesNames = getEvolutionChainSpeciesNames(
        chain,
        [],
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
        <div className="flex flex-row flex-wrap items-center gap-8 max-md:flex-col">
          {evolutionChainSpeciesNames.map((elem, index) => (
            <div
              className="flex flex-col items-center hover:cursor-pointer"
              key={index}
              onClick={() => setSearchValue(elem)}
            >
              <LoadAndRenderImage name={elem} />
              <p>{firstLetterToUpperCase(elem)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default EvolutionChainTab

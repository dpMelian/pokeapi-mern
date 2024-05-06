import React, { useEffect, useState } from "react"

import getEvolutionChainSpeciesNames from "../helpers/getEvolutionChainSpeciesNames"
import LoadAndRenderImage from "./LoadAndRenderImage"
import useGetEvolutionChain from "../hooks/useGetEvolutionChain"

import {
  type Chain,
  type EvolutionChain,
} from "../types/evolution/evolutionChain"
import { Card, CardContent } from "./ui/card"
import { firstLetterToUpperCase } from "@/helpers/firstLetterToUpperCase"
import { getEvolutionDetails } from "@/helpers/getEvolutionDetails"
import { PokemonSpecies } from "@/types/pokemon/pokemonSpecies"
import { getEvolutionLine } from "@/helpers/getEvolutionLine"
import { FormatEvolutionDetail } from "@/components/FormatEvolutionDetail"
import { entries } from "@/types/keyValueType"

type Props = {
  pokemonSpecies: PokemonSpecies
  setSearchValue: React.Dispatch<React.SetStateAction<string | number>>
}

const EvolutionChain = ({ pokemonSpecies, setSearchValue }: Props) => {
  const { data: evolutionChain, isLoading } = useGetEvolutionChain(
    pokemonSpecies?.evolution_chain.url,
  ) as unknown as { data: EvolutionChain; isLoading: boolean }

  const [evolutionChainSpeciesNames, setEvolutionChainSpeciesNames] = useState(
    [] as string[],
  )
  const [evolutionChainSpeciesURLs, setEvolutionChainSpeciesURLs] = useState(
    [] as string[],
  )

  useEffect(() => {
    if (evolutionChain?.chain.species.name.length > 0) {
      const { chain } = evolutionChain as unknown as { chain: Chain }
      const { evolutionChainSpeciesNames, evolutionChainSpeciesURLs } =
        getEvolutionChainSpeciesNames(chain, [], [])
      setEvolutionChainSpeciesNames(evolutionChainSpeciesNames)
      setEvolutionChainSpeciesURLs(evolutionChainSpeciesURLs)
    }
  }, [evolutionChain])

  const evolutionLine = getEvolutionLine({
    chain: evolutionChain?.chain,
    currentLevel: 0,
    res: [],
  })

  return (
    <div>
      {!isLoading && evolutionChainSpeciesNames.length <= 1 && (
        <p>This pokémon has no evolutions</p>
      )}
      {evolutionLine?.map((evolution) => {
        if (evolution.level === 1) {
          const baseEvolution = evolutionLine.find(
            (evolution) => evolution.level === 0,
          )

          if (!baseEvolution) return
          const evolutionDetails = getEvolutionDetails(evolution.details)
          const nextEvolutionDetails = getEvolutionDetails(
            evolution.next?.[0]?.evolution_details,
          )

          return (
            <div
              key={evolution.name}
              className="flex flex-col items-center gap-4 self-center md:flex-row"
            >
              <div className="max-h-xs flex max-w-xs flex-row">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square flex-col items-center justify-center">
                      <LoadAndRenderImage identifier={baseEvolution.name} />
                      <div className="py-2 text-center text-sm">
                        {firstLetterToUpperCase(baseEvolution.name)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {evolutionDetails && (
                <div className="flex flex-col">
                  {/* TODO: handle other items in the array i.e. regional forms evolutions, don't just pick first element */}
                  {entries(evolutionDetails).map(([key, value], index) => {
                    if (value) {
                      return (
                        <FormatEvolutionDetail
                          key={`${key}-${index}`}
                          objectKey={key}
                          value={value}
                        />
                      )
                    }
                  })}
                </div>
              )}

              <div className="max-h-xs flex max-w-xs flex-row">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square flex-col items-center justify-center">
                      <LoadAndRenderImage identifier={evolution.name} />
                      <div className="py-2 text-center text-sm">
                        {firstLetterToUpperCase(evolution.name)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {nextEvolutionDetails && (
                <div className="flex flex-col">
                  {/* TODO: handle other items in the array i.e. regional forms evolutions, don't just pick first element */}
                  {entries(nextEvolutionDetails).map(([key, value], index) => {
                    if (value) {
                      return (
                        <FormatEvolutionDetail
                          key={`${key}-${index}`}
                          objectKey={key}
                          value={value}
                        />
                      )
                    }
                  })}
                </div>
              )}

              {evolution.next?.[0] && (
                <div className="max-h-xs flex max-w-xs flex-row">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square flex-col items-center justify-center">
                        <LoadAndRenderImage
                          identifier={evolution.next[0].species.name || ""}
                        />
                        <div className="py-2 text-center text-sm">
                          {firstLetterToUpperCase(
                            evolution.next[0].species.name,
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )
        }
      })}
    </div>
  )
}

export default EvolutionChain

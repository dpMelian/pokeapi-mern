import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Select, { type SingleValue } from "react-select"
import { IconRuler2, IconSearch, IconWeight } from "@tabler/icons-react"
import Header from "./components/Header"
import StatIcon from "./components/StatIcon"
import SearchInput from "./components/SearchInput"
import StatBar from "./components/StatBar"
import TypeBadge from "./components/TypeBadge"
import { firstLetterToUpperCase } from "./helpers/firstLetterToUpperCase"
import { getColorRange } from "./helpers/getColorRange"
import { POKEMON_GENERATION_RANGES } from "./constants/pokemonGenerations"
import { useGetPokemonByName } from "./hooks/useGetPokemonByName"
import { type Pokemon } from "./interfaces/pokemon"

const Container = styled.main`
  width: 80%;
  margin: 1rem auto;
`

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LargeImage = styled.img`
  transform: scale(1.5);
  padding: 0 2rem;
`

const TypeBadgeContainer = styled.div`
  display: grid;
  grid-gap: 5px;
`

const Main = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("pikachu")
  const [spriteOptions, setSpriteOptions] = useState(
    [] as Array<{ value: string; label: string }>
  )
  const [selectedSprite, setSelectedSprite] = useState("")

  const { data, isLoading, isError } = useGetPokemonByName(
    searchValue
  ) as unknown as {
    data: Pokemon
    isLoading: boolean
    isError: boolean
  }

  const handleOnSubmit = (searchInputValue: string): void => {
    setSearchValue(searchInputValue.toLowerCase())
  }

  useEffect(() => {
    if (data == null) return

    let selectedGeneration = ""
    const spriteOptions: Array<{ value: string; label: string }> = []

    for (const [generation, versions] of Object.entries(
      data.sprites.versions
    )) {
      const { front_default: frontDefault } =
        versions[POKEMON_GENERATION_RANGES[generation].version]

      if (frontDefault !== null) {
        if (selectedGeneration.length === 0) {
          selectedGeneration = generation
        }

        spriteOptions.push({
          value: generation,
          label: firstLetterToUpperCase(generation),
        })
      }
    }

    if (selectedGeneration.length === 0) {
      return
    }

    const selectedVersion =
      POKEMON_GENERATION_RANGES[selectedGeneration].version

    setSelectedSprite(
      data.sprites.versions[selectedGeneration][selectedVersion].front_default
    )
    setSpriteOptions(spriteOptions)
  }, [data])

  const updateSelectedSprite = (
    event: SingleValue<{ value: string; label: string }>
  ): void => {
    if (event === null) {
      return
    }
    const version = POKEMON_GENERATION_RANGES[event.value].version

    setSelectedSprite(
      data?.sprites.versions?.[event.value][version].front_default
    )
  }

  return (
    <>
      <Header />
      <Container>
        <SearchInput handleOnSubmit={handleOnSubmit} />

        {isError && <p>Pokémon {searchValue} not found</p>}
        {!isError && isLoading && (
          <Loading>
            <IconSearch />
            <span>
              Searching Pokémon{" "}
              <strong>{firstLetterToUpperCase(searchValue)}</strong>...
            </span>
          </Loading>
        )}
        {!isError && !isLoading && (
          <>
            <h2>You have searched for {firstLetterToUpperCase(searchValue)}</h2>
            <h2>
              Sprite:
              <LargeImage src={selectedSprite ?? ""} alt="pokemon sprite" />
            </h2>

            <Select
              options={spriteOptions}
              onChange={(e) => {
                updateSelectedSprite(e)
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: "20rem",
                }),
              }}
            />

            <h2>
              Abilities:
              <ul>
                {data?.abilities.map(({ ability, is_hidden: isHidden }) => (
                  <li key={ability.name}>
                    {firstLetterToUpperCase(ability.name)}
                    {isHidden && " (hidden ability)"}
                  </li>
                ))}
              </ul>
            </h2>

            <h2>
              Types:
              <p>
                <TypeBadgeContainer>
                  {data?.types.map(({ type }) => (
                    <TypeBadge key={type.name} type={type.name} />
                  ))}
                </TypeBadgeContainer>
              </p>
            </h2>

            <h2>
              <p>Stats:</p>
              {data?.stats.map((stat) => (
                <>
                  <StatIcon name={stat.stat.name} icon={stat.stat.name} />
                  <StatBar
                    value={stat.base_stat}
                    rangeColor={getColorRange(stat.base_stat)}
                  />
                </>
              ))}
            </h2>

            <h2>
              <IconWeight />
              Weight: {data?.weight}
            </h2>

            <h2>
              <IconRuler2 />
              Height: {data?.height}
            </h2>
          </>
        )}
      </Container>
    </>
  )
}

export default Main

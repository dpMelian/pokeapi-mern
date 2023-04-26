import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Select, { type SingleValue } from "react-select"
import {
  IconRuler2,
  IconSearch,
  IconWeight,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react"
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
import useAddFavoritePokemon from "./hooks/useAddFavoritePokemon"
// import useGetTrainerFavorite from "./hooks/useGetTrainerFavorite"

const Base = styled.div`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme["primary--darker"]};
`

const Container = styled.main`
  margin: 1rem auto;
  width: 80%;
`

const Card = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme["secondary--lighter"]};
  border-radius: 10px;
  border: 5px solid ${(props) => props.theme["primary--darker"]};
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  position: relative;
  width: 70%;
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 1rem;
`

const IconWrapper = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
`

const H2Border = styled.h2`
  border-bottom: 5px solid ${(props) => props.theme["primary--darker"]};
  text-align: center;
  width: 100%;
`

const Loading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ArtworkImage = styled.img`
  object-fit: contain;
  height: 300px;
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
  const [searchValue, setSearchValue] = useState(
    Math.floor(Math.random() * (1010 - 1) + 1) as string | number
  )
  const [spriteOptions, setSpriteOptions] = useState(
    [] as Array<{ value: string; label: string }>
  )
  const [selectedSprite, setSelectedSprite] = useState("")
  const [isPokemonFavorited, setIsPokemonFavorited] = useState(false)
  const [artworkImage, setArtworkImage] = useState("")

  const { data, isLoading, isError } = useGetPokemonByName(
    searchValue
  ) as unknown as {
    data: Pokemon
    isLoading: boolean
    isError: boolean
  }

  const addFavoritePokemon = useAddFavoritePokemon()
  // const { data: favoritePokemonId } = useGetTrainerFavorite()

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

    if (data.sprites.other.dream_world.front_default != null) {
      setArtworkImage(data.sprites.other.dream_world.front_default)
    } else {
      setArtworkImage(data.sprites.other["official-artwork"].front_default)
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
    <Base>
      <Header />
      <Container>
        <h1>Discover the World of Pokémon with PokéAPI MERN</h1>
        <p>
          With our intuitive user interface and powerful search capabilities,
          you can easily find information about your favorite Pokémon: sprites,
          abilities, types, stats and more!
        </p>

        <SearchInput handleOnSubmit={handleOnSubmit} />

        {isError && <p>Pokémon {searchValue} not found</p>}
        {!isError && isLoading && (
          <Loading>
            <IconSearch />
            <span>
              Searching Pokémon{" "}
              <strong>
                {typeof searchValue === "string"
                  ? firstLetterToUpperCase(searchValue)
                  : searchValue}
              </strong>
              ...
            </span>
          </Loading>
        )}
        <Card>
          {!isError && !isLoading && (
            <>
              <H2Border>{`${firstLetterToUpperCase(data.name)} #${
                data.id
              }`}</H2Border>
              {isPokemonFavorited ? (
                <IconWrapper>
                  <IconStarFilled />
                </IconWrapper>
              ) : (
                <IconWrapper>
                  <IconStar
                    onClick={() => {
                      addFavoritePokemon.mutate(data.id, {
                        onSuccess: () => {
                          setIsPokemonFavorited(true)
                        },
                      })
                    }}
                  />
                </IconWrapper>
              )}
              <a href={artworkImage} target="_blank" rel="noreferrer">
                <ArtworkImage
                  src={artworkImage}
                  alt="pokemon dream world image"
                />
              </a>
              <CardContainer>
                <div>
                  <h2>Abilities:</h2>
                  <ul>
                    {data?.abilities.map(({ ability, is_hidden: isHidden }) => (
                      <li key={ability.name}>
                        {firstLetterToUpperCase(ability.name)}
                        {isHidden && " (hidden ability)"}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2>Types:</h2>
                  <TypeBadgeContainer>
                    {data?.types.map(({ type }) => (
                      <TypeBadge key={type.name} type={type.name} />
                    ))}
                  </TypeBadgeContainer>
                </div>

                <div>
                  <h2>Stats:</h2>
                  {data?.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <StatIcon name={stat.stat.name} icon={stat.stat.name} />
                      <StatBar
                        value={stat.base_stat}
                        rangeColor={getColorRange(stat.base_stat)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <h2>
                    <IconWeight />
                    Weight: {data?.weight}
                  </h2>

                  <h2>
                    <IconRuler2 />
                    Height: {data?.height}
                  </h2>
                </div>
                {spriteOptions.length > 0 && (
                  <>
                    <h2>
                      Sprite:
                      <LargeImage
                        src={selectedSprite ?? ""}
                        alt="pokemon sprite"
                      />
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
                  </>
                )}
              </CardContainer>
            </>
          )}
        </Card>
      </Container>
    </Base>
  )
}

export default Main

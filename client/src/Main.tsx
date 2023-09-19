import React, { useState } from "react"
import styled, { useTheme } from "styled-components"
import Select, { type SingleValue } from "react-select"
import {
  IconRuler2,
  IconWeight,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react"
import Box from "@mui/material/Box/Box"
import Skeleton from "@mui/material/Skeleton"
import Tab from "@mui/material/Tab/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList/TabList"
import TabPanel from "@mui/lab/TabPanel/TabPanel"
import EvolutionChainTab from "./components/EvolutionChainTab"
import Header from "./components/Header"
import SearchInput from "./components/SearchInput"
import StatBar from "./components/StatBar"
import StatIcon from "./components/StatIcon"
import TypeBadge from "./components/TypeBadge"
import { firstLetterToUpperCase } from "./helpers/firstLetterToUpperCase"
import { getColorRange } from "./helpers/getColorRange"
import { POKEMON_GENERATION_RANGES } from "./constants/pokemonGenerations"
import { type Pokemon } from "./interfaces/pokemon"
import { type PokemonSpecies } from "./interfaces/pokemonSpecies"
import { TYPES } from "./constants/pokemonTypes"
import getAvailableSpriteOptions from "./helpers/getAvailableSpriteOptions"
import useAddFavoritePokemon from "./hooks/useAddFavoritePokemon"
import useGetPokemonByName from "./hooks/useGetPokemonByName"
import useGetPokemonSpeciesByName from "./hooks/useGetPokemonSpeciesByName"
// import useGetTrainerFavorite from "./hooks/useGetTrainerFavorite"

interface CardHeaderProps {
  pokemonType: string
}

interface JapaneseTextBackgroundProps {
  pokemonType: string
}

interface SkeletonStyledProps {
  margin: string
}

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
  width: 60%;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`

const CardHeader = styled.div<CardHeaderProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  border-bottom: 5px solid ${(props) => props.theme["primary--darker"]};
  background-color: ${(props) => TYPES[props.pokemonType]};
  width: 100%;
  position: relative;
  z-index: 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  padding: 1rem;
  width: 100%;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    justify-items: start;
  }
`

const IconWrapper = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
`

const ArtworkImage = styled.img`
  height: 200px;
  object-fit: contain;
  padding: 1rem;
  position: relative;
  width: 100%;
  z-index: 2;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`

const H1 = styled.h1`
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 2;
`

const JapaneseTextBackground = styled.span<JapaneseTextBackgroundProps>`
  align-self: center;
  color: ${(props) => TYPES[props.pokemonType]};
  filter: brightness(60%);
  font-size: 64px;
  font-weight: bold;
  grid-column: 2/3;
  justify-self: center;
  margin: 0 auto;
  position: absolute;
  z-index: 1;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const SingleColumn = styled.div`
  grid-column: 1/3;
  margin: 1rem auto;
  width: 60%;
`

const LargeImage = styled.img`
  transform: scale(1.5);
  padding: 0 2rem;
`

const SkeletonStyled = styled(Skeleton)<SkeletonStyledProps>`
  margin: ${(props) => props.margin};
`

const BoxStyled = styled(Box)`
  font-family: "Kadwa";
`

const StyledTabPanel = styled(TabPanel)`
  width: 75%;
`

const TypeBadgeContainer = styled.div`
  display: grid;
  grid-gap: 5px;
`

const Main = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState(
    Math.floor(Math.random() * (1010 - 1) + 1) as string | number
  )

  const [selectedSprite, setSelectedSprite] = useState("")
  const [isPokemonFavorited, setIsPokemonFavorited] = useState(false)
  const [tabValue, setTabValue] = useState("1")

  const { data, isLoading, isError } = useGetPokemonByName(
    searchValue
  ) as unknown as {
    data: Pokemon
    isLoading: boolean
    isError: boolean
  }

  const { data: pokemonSpecies } = useGetPokemonSpeciesByName(
    searchValue
  ) as unknown as { data: PokemonSpecies }

  const theme = useTheme() as {
    primary: string
    secondary: string
    "primary--darker": string
    "secondary--darker": string
    "secondary--lighter": string
  }

  const addFavoritePokemon = useAddFavoritePokemon()
  // const { data: favoritePokemonId } = useGetTrainerFavorite()

  const handleTabChange = (
    _e: React.ChangeEvent<unknown>,
    value: string
  ): void => {
    setTabValue(value)
  }

  const handleOnSubmit = (searchInputValue: string): void => {
    setSearchValue(searchInputValue.toLowerCase())
  }

  if (isError) {
    return <p>Pokémon {searchValue} not found</p>
  }

  if (!isError && isLoading) {
    return (
      <>
        <SkeletonStyled
          variant="rounded"
          width={"60%"}
          height={"24rem"}
          animation="wave"
          margin="2rem auto 1rem auto"
        />
        <SkeletonStyled
          variant="rounded"
          width={"60%"}
          height={"32rem"}
          animation="wave"
          margin="0 auto"
        />
      </>
    )
  }

  const {
    abilities: pokemonAbilities,
    height: pokemonHeight,
    id: pokemonId,
    name: pokemonName,
    sprites: pokemonSprites,
    stats: pokemonStats,
    types: pokemonTypes,
    weight: pokemonWeight,
  } = data

  const { firstAvailableGeneration, spriteOptions } = getAvailableSpriteOptions(
    pokemonSprites.versions
  )

  const updateSelectedSprite = (
    event: SingleValue<{ value: string; label: string }>
  ): void => {
    if (event === null) {
      return
    }
    const version = POKEMON_GENERATION_RANGES[event.value].version

    setSelectedSprite(
      pokemonSprites.versions?.[event.value][version].front_default
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

        <Card>
          {!isError && !isLoading && (
            <>
              <CardHeader pokemonType={pokemonTypes[0]?.type.name}>
                <a
                  href={
                    pokemonSprites.other.dream_world.front_default ??
                    pokemonSprites.other["official-artwork"].front_default
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArtworkImage
                    src={
                      pokemonSprites.other.dream_world.front_default ??
                      pokemonSprites.other["official-artwork"].front_default
                    }
                    alt="pokemon dream world image"
                  />
                </a>
                <H1>
                  {`${firstLetterToUpperCase(pokemonName)} #${pokemonId}`}
                  {isPokemonFavorited ? (
                    <IconWrapper>
                      <IconStarFilled />
                    </IconWrapper>
                  ) : (
                    <IconWrapper>
                      <IconStar
                        onClick={() => {
                          addFavoritePokemon.mutate(pokemonId, {
                            onSuccess: () => {
                              setIsPokemonFavorited(true)
                            },
                          })
                        }}
                      />
                    </IconWrapper>
                  )}
                </H1>
                <JapaneseTextBackground
                  pokemonType={pokemonTypes[0]?.type.name}
                >
                  {pokemonSpecies?.names[0].name}
                </JapaneseTextBackground>
                <SingleColumn>
                  <SearchInput handleOnSubmit={handleOnSubmit} />
                </SingleColumn>
              </CardHeader>

              <CardContainer>
                <TabContext value={tabValue}>
                  <BoxStyled
                    sx={{
                      borderBottom: 5,
                      borderColor: `${theme["primary--darker"]}`,
                    }}
                  >
                    <TabList
                      aria-label="Pokémon data tabs"
                      onChange={handleTabChange}
                      sx={{
                        "& .MuiTabs-scroller": {
                          "& .MuiTabs-flexContainer": {
                            flexWrap: "wrap",
                          },
                        },
                      }}
                    >
                      <Tab label="Stats" value="1" />
                      <Tab label="Abilities" value="2" />
                      <Tab label="Types" value="3" />
                      <Tab label="Weight" value="4" />
                      <Tab label="Height" value="5" />
                      <Tab label="Sprite" value="6" />
                      <Tab label="Evolutions" value="7" />
                    </TabList>
                  </BoxStyled>

                  <StyledTabPanel value="1">
                    {pokemonStats.map((stat) => (
                      <div key={stat.stat.name}>
                        <StatIcon name={stat.stat.name} icon={stat.stat.name}>
                          <StatBar
                            value={stat.base_stat}
                            rangeColor={getColorRange(stat.base_stat)}
                          />
                        </StatIcon>
                      </div>
                    ))}
                  </StyledTabPanel>
                  <TabPanel value="2">
                    <ul>
                      {pokemonAbilities.map(
                        ({ ability, is_hidden: isHidden }) => (
                          <li key={ability.name}>
                            {firstLetterToUpperCase(ability.name)}
                            {isHidden && " (hidden ability)"}
                          </li>
                        )
                      )}
                    </ul>
                  </TabPanel>
                  <TabPanel value="3">
                    <TypeBadgeContainer>
                      {pokemonTypes.map(({ type }) => (
                        <TypeBadge key={type.name} type={type.name} />
                      ))}
                    </TypeBadgeContainer>
                  </TabPanel>
                  <TabPanel value="4">
                    <h2>
                      <IconWeight />
                      {pokemonWeight}
                    </h2>
                  </TabPanel>
                  <TabPanel value="5">
                    <h2>
                      <IconRuler2 />
                      {pokemonHeight}
                    </h2>
                  </TabPanel>
                  <TabPanel value="6">
                    {spriteOptions.length > 0 && (
                      <>
                        <LargeImage
                          src={
                            selectedSprite.length > 0
                              ? selectedSprite
                              : pokemonSprites.versions[
                                  firstAvailableGeneration
                                ][
                                  POKEMON_GENERATION_RANGES[
                                    firstAvailableGeneration
                                  ].version
                                ].front_default
                          }
                          alt="pokemon sprite"
                        />

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
                  </TabPanel>
                  <TabPanel value="7">
                    <EvolutionChainTab pokemonSpecies={pokemonSpecies} />
                  </TabPanel>
                </TabContext>
              </CardContainer>
            </>
          )}
        </Card>
      </Container>
    </Base>
  )
}

export default Main

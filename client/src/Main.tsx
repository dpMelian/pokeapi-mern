import React, { useState } from "react"
import { useTheme } from "styled-components"
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
import { cn } from "./helpers/cn"
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
        <Skeleton
          variant="rounded"
          width={"60%"}
          height={"24rem"}
          animation="wave"
          className="mt-8 mb-4 mx-auto"
        />
        <Skeleton
          variant="rounded"
          width={"60%"}
          height={"32rem"}
          animation="wave"
          className="my-0 mx-auto"
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

  const typeColors = TYPES[pokemonTypes[0]?.type.name ?? "default"]

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
    <div className="bg-secondary text-primary--darker">
      <Header />
      <main className="mx-auto my-4 w-4/5">
        <h1>Discover the World of Pokémon with PokéAPI MERN</h1>
        <p>
          With our intuitive user interface and powerful search capabilities,
          you can easily find information about your favorite Pokémon: sprites,
          abilities, types, stats and more!
        </p>

        <div className="items-center bg-secondary--lighter rounded-[10px] border-[5px] border-solid border-primary--darker flex flex-col mx-auto my-8 relative w-3/5 max-md:w-[90%]">
          {!isError && !isLoading && (
            <>
              <div
                className={cn(
                  "grid grid-cols-2 gap-16 border-b-[5px] border-solid border-b-primary--darker w-full relative z-0 max-md:grid-cols-1",
                  typeColors
                )}
              >
                <a
                  href={
                    pokemonSprites.other.dream_world.front_default ??
                    pokemonSprites.other["official-artwork"].front_default
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="h-[200px] object-contain p-4 relative w-full z-[2] max-md:p-0"
                    src={
                      pokemonSprites.other.dream_world.front_default ??
                      pokemonSprites.other["official-artwork"].front_default
                    }
                    alt="pokemon dream world image"
                  />
                </a>
                <h1 className="relative text-center w-full z-[2]">
                  {`${firstLetterToUpperCase(pokemonName)} #${pokemonId}`}
                  {isPokemonFavorited ? (
                    <span className="absolute top-[5px] right-[5px]">
                      <IconStarFilled />
                    </span>
                  ) : (
                    <span className="absolute top-[5px] right-[5px]">
                      <IconStar
                        onClick={() => {
                          addFavoritePokemon.mutate(pokemonId, {
                            onSuccess: () => {
                              setIsPokemonFavorited(true)
                            },
                          })
                        }}
                      />
                    </span>
                  )}
                </h1>
                <span
                  className={`self-center text-[${typeColors}] brightness-50 text-6xl font-bold col-span-1 justify-self-center my-0 mx-auto absolute z-1 max-md:hidden`}
                >
                  {pokemonSpecies?.names[0].name}
                </span>
                <div className="col-span-2 my-4 mx-auto w-3/5">
                  <SearchInput handleOnSubmit={handleOnSubmit} />
                </div>
              </div>

              <div className="grid grid-cols-1 justify-items-center p-4 w-full md:grid md:grid-cols-1 md-justify-start">
                <TabContext value={tabValue}>
                  <Box
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
                  </Box>

                  <TabPanel className="w-3/4" value="1">
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
                  </TabPanel>
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
                    <div className="grid gap-[5px]">
                      {pokemonTypes.map(({ type }) => (
                        <TypeBadge key={type.name} type={type.name} />
                      ))}
                    </div>
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
                        <img
                          className="transform scale-150 py-0 px-8"
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
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Main

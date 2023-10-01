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
    Math.floor(Math.random() * (1010 - 1) + 1) as string | number,
  )

  const [selectedSprite, setSelectedSprite] = useState("")
  const [isPokemonFavorited, setIsPokemonFavorited] = useState(false)
  const [tabValue, setTabValue] = useState("1")

  const { data, isLoading, isError } = useGetPokemonByName(
    searchValue,
  ) as unknown as {
    data: Pokemon
    isLoading: boolean
    isError: boolean
  }

  const { data: pokemonSpecies } = useGetPokemonSpeciesByName(
    searchValue,
  ) as unknown as { data: PokemonSpecies }

  const theme = useTheme() as {
    primary: string
    secondary: string
    "primary--darker": string
    "secondary--darker": string
  }

  const addFavoritePokemon = useAddFavoritePokemon()
  // const { data: favoritePokemonId } = useGetTrainerFavorite()

  const handleTabChange = (
    _e: React.ChangeEvent<unknown>,
    value: string,
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
          className="mx-auto mb-4 mt-8"
        />
        <Skeleton
          variant="rounded"
          width={"60%"}
          height={"32rem"}
          animation="wave"
          className="mx-auto my-0"
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
    pokemonSprites.versions,
  )

  const updateSelectedSprite = (
    event: SingleValue<{ value: string; label: string }>,
  ): void => {
    if (event === null) {
      return
    }
    const version = POKEMON_GENERATION_RANGES[event.value].version

    setSelectedSprite(
      pokemonSprites.versions?.[event.value][version].front_default,
    )
  }

  return (
    <div className="bg-primary dark:bg-slate-700 dark:text-primary">
      <Header />
      <main className="mx-auto my-4 w-4/5">
        <h1>Discover the World of Pokémon with PokéAPI MERN</h1>
        <p>
          With our intuitive user interface and powerful search capabilities,
          you can easily find information about your favorite Pokémon: sprites,
          abilities, types, stats and more!
        </p>

        <div className="relative mx-auto my-8 flex w-3/5 flex-col items-center rounded-[10px] border-[5px] border-solid border-black bg-primary--darker dark:bg-slate-700 max-md:w-[90%]">
          {!isError && !isLoading && (
            <>
              <div
                className={cn(
                  "relative z-0 grid w-full grid-cols-2 gap-16 border-b-[5px] border-solid border-b-black max-md:grid-cols-1",
                  typeColors,
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
                    className="relative z-[2] h-[200px] w-full object-contain p-4 max-md:p-0"
                    src={
                      pokemonSprites.other.dream_world.front_default ??
                      pokemonSprites.other["official-artwork"].front_default
                    }
                    alt="pokemon dream world image"
                  />
                </a>
                <h1 className="relative z-[2] w-full text-center">
                  {`${firstLetterToUpperCase(pokemonName)} #${pokemonId}`}
                  {isPokemonFavorited ? (
                    <span className="absolute right-[5px] top-[5px]">
                      <IconStarFilled />
                    </span>
                  ) : (
                    <span className="absolute right-[5px] top-[5px]">
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
                  className={`self-center text-[${typeColors}] z-1 absolute col-span-1 mx-auto my-0 justify-self-center text-6xl font-bold brightness-50 max-md:hidden`}
                >
                  {pokemonSpecies?.names[0].name}
                </span>
                <div className="col-span-2 mx-auto my-4 w-3/5">
                  <SearchInput handleOnSubmit={handleOnSubmit} />
                </div>
              </div>

              <div className="md-justify-start grid w-full grid-cols-1 justify-items-center p-4 md:grid md:grid-cols-1">
                <TabContext value={tabValue}>
                  <Box
                    sx={{
                      borderBottom: 5,
                      borderColor: "black",
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
                        ),
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
                          className="scale-150 transform px-8 py-0"
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

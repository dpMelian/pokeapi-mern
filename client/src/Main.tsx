import { IconStar, IconStarFilled } from "@tabler/icons-react"
import { Ruler, Weight } from "lucide-react"
import { useState } from "react"
import Select, { type SingleValue } from "react-select"
import Skeleton from "@mui/material/Skeleton"

import AbilityDetails from "./components/AbilityDetails"
import EvolutionChainTab from "./components/EvolutionChainTab"
import Footer from "./components/Footer"
import Header from "./components/Header"
import SearchInput from "./components/SearchInput"
import StatBar from "./components/StatBar"
import StatIcon from "./components/StatIcon"
import TypeBadge from "./components/TypeBadge"

import { cn } from "./helpers/cn"
import { firstLetterToUpperCase } from "./helpers/firstLetterToUpperCase"
import { getColorRange } from "./helpers/getColorRange"
import { POKEMON_GENERATION_RANGES } from "./constants/pokemonGenerations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TYPES } from "./constants/pokemonTypes"

import getAvailableSpriteOptions from "./helpers/getAvailableSpriteOptions"
import useAddFavoritePokemon from "./hooks/useAddFavoritePokemon"
import useGetPokemons from "./hooks/useGetPokemons"
import useGetPokemonSpecies from "./hooks/useGetPokemonSpecies"

import { PokemonSpecies } from "./types/pokemonSpecies"
import { type Pokemon } from "./interfaces/pokemon"

// import useGetTrainerFavorite from "./hooks/useGetTrainerFavorite"

const Main = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState(
    Math.floor(Math.random() * (1010 - 1) + 1) as string | number,
  )

  const [selectedSprite, setSelectedSprite] = useState("")
  const [isPokemonFavorited, setIsPokemonFavorited] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0)

  const {
    data: pokemonSpecies,
    isLoading,
    isError,
  } = useGetPokemonSpecies(searchValue) as unknown as {
    data: PokemonSpecies
    isLoading: boolean
    isError: boolean
  }

  const { data: pokemons, isLoading: isPokemonsLoading } = useGetPokemons(
    pokemonSpecies?.varieties.map(({ pokemon }) => pokemon.name) ?? [],
  ) as unknown as { data: Pokemon[]; isLoading: boolean }

  const addFavoritePokemon = useAddFavoritePokemon()
  // const { data: favoritePokemonId } = useGetTrainerFavorite()

  const tabOptions = [
    "Evolutions",
    "Stats",
    "Types",
    "Sprite",
    "Abilities",
    "Weight",
    "Height",
  ]

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
  } = pokemons?.[selectedVariant] ?? {}

  const typeColors =
    pokemonTypes && pokemonTypes[0]
      ? TYPES[pokemonTypes[0]?.type.name]
      : TYPES.default

  const { firstAvailableGeneration, spriteOptions } = getAvailableSpriteOptions(
    pokemonSprites?.versions ?? {},
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
    <div className="flex h-screen flex-col justify-between bg-primary transition-all ease-in-out dark:bg-slate-700 dark:text-primary">
      <Header />
      <main className="mx-auto mb-auto mt-4 w-4/5">
        <h1>Discover the World of Pokémon with PokéAPI MERN</h1>
        <p>
          With our intuitive user interface and powerful search capabilities,
          you can easily find information about your favorite Pokémon: sprites,
          abilities, types, stats and more!
        </p>

        <div className="relative mx-auto my-8 flex w-3/5 flex-col items-center rounded-[10px] border-4 border-solid border-black bg-primary--darker transition-all ease-in-out dark:bg-slate-700 max-md:w-[90%]">
          {!isError && !isLoading && (
            <>
              <div
                className={cn(
                  "relative z-0 grid w-full grid-cols-2 gap-16 rounded-t-md border-0 border-b-4 border-solid border-b-black max-md:grid-cols-1",
                  typeColors,
                )}
              >
                <a
                  href={
                    pokemonSprites?.other["official-artwork"].front_default ??
                    pokemonSprites?.other.dream_world.front_default
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="relative z-[2] h-[200px] w-full object-contain p-4 max-md:p-0"
                    src={
                      pokemonSprites?.other["official-artwork"].front_default ??
                      pokemonSprites?.other.dream_world.front_default
                    }
                    alt="pokemon artwork image"
                  />
                </a>
                <div className="relative z-[2] w-full text-center">
                  {!isPokemonsLoading && (
                    <Select
                      defaultValue={{
                        value: pokemons?.[0].id,
                        label: `${firstLetterToUpperCase(pokemons?.[0].name)}`,
                      }}
                      options={pokemons?.map((pokemon) => ({
                        value: pokemon.id,
                        label: `${firstLetterToUpperCase(pokemon.name)}`,
                      }))}
                      onChange={(e) => {
                        if (e === null) return
                        const newSearchPokemon = pokemons?.find(
                          (pokemon, index) => {
                            if (pokemon.id === e.value) {
                              setSelectedVariant(index)
                              return true
                            }
                          },
                        )
                        setSearchValue(newSearchPokemon?.species.name ?? "")
                      }}
                    />
                  )}
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
                  <div
                    className={cn(isPokemonsLoading && "hidden")}
                  >{`#${pokemons?.[0].id}`}</div>
                </div>
                <div className="col-span-2 mx-auto my-4 w-3/5 max-md:col-span-1">
                  <SearchInput
                    handleOnSubmit={handleOnSubmit}
                    setSearchValue={setSearchValue}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col flex-wrap items-center gap-4 p-4">
                <Tabs
                  className="w-3/5 max-2xl:w-full"
                  defaultValue={tabOptions[0]}
                >
                  <TabsList className="grid w-full grid-cols-7">
                    {tabOptions.map((tabOption) => (
                      <TabsTrigger key={tabOption} value={tabOption}>
                        {tabOption}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value={tabOptions[0]}>
                    {pokemonSpecies && (
                      <EvolutionChainTab
                        pokemonSpecies={pokemonSpecies}
                        setSearchValue={setSearchValue}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value={tabOptions[1]}>
                    {pokemonStats?.map((stat) => (
                      <div key={stat.stat.name}>
                        <StatIcon
                          name={stat.stat.name}
                          icon={stat.stat.name}
                          statValue={stat.base_stat}
                        >
                          <StatBar
                            value={stat.base_stat}
                            rangeColor={getColorRange(stat.base_stat)}
                          />
                        </StatIcon>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value={tabOptions[2]}>
                    <div className="grid gap-[5px]">
                      {pokemonTypes?.map(({ type }) => (
                        <TypeBadge key={type.name} type={type.name} />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value={tabOptions[3]}>
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
                  </TabsContent>
                  <TabsContent value={tabOptions[4]}>
                    <ul>
                      {pokemonAbilities?.map(
                        ({ ability, is_hidden: isHidden }) => (
                          <div key={ability.name}>
                            <li>
                              {firstLetterToUpperCase(ability.name)}
                              {isHidden && " (hidden ability)"}
                            </li>
                            <AbilityDetails url={ability.url} />
                          </div>
                        ),
                      )}
                    </ul>
                  </TabsContent>
                  <TabsContent value={tabOptions[5]}>
                    <h2>
                      <Weight />
                      {pokemonWeight / 10} kg
                    </h2>
                  </TabsContent>
                  <TabsContent value={tabOptions[6]}>
                    <h2>
                      <Ruler />
                      {pokemonHeight / 10} m
                    </h2>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Main

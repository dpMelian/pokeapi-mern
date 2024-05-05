import { IconStar, IconStarFilled } from "@tabler/icons-react"
import { Ruler, Weight } from "lucide-react"
import { useState } from "react"

import AbilityDetails from "./components/AbilityDetails"
import EvolutionChain from "./components/EvolutionChain"
import Footer from "./components/Footer"
import Header from "./components/Header"
import SearchInput from "./components/SearchInput"
import StatBar from "./components/StatBar"
import StatIcon from "./components/StatIcon"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion"
import { Badge } from "./components/ui/badge"
import { cn } from "./helpers/cn"
import { firstLetterToUpperCase } from "./helpers/firstLetterToUpperCase"
import { getColorRange } from "./helpers/getColorRange"
import { PokemonSpecies } from "./types/pokemon/pokemonSpecies"
import { Progress } from "./components/ui/progress"
import { stats } from "./constants/stats"
import { type Pokemon } from "./interfaces/pokemon"
import { TYPES_PASTEL } from "./constants/pokemonTypesPastel"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import useAddFavoritePokemon from "./hooks/useAddFavoritePokemon"
import useGetPokemons from "./hooks/useGetPokemons"
import useGetPokemonSpecies from "./hooks/useGetPokemonSpecies"
import { typeIcons } from "./constants/typeIcons"
import { Separator } from "./components/ui/separator"
import { Skeleton } from "./components/ui/skeleton"

// import useGetTrainerFavorite from "./hooks/useGetTrainerFavorite"

const Main = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState(
    Math.floor(Math.random() * (1010 - 1) + 1) as string | number,
  )

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
    setSelectedVariant(0)
    setSearchValue(searchInputValue.toLowerCase())
  }

  if (isError) {
    return <p>Pokémon {searchValue} not found</p>
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

  return (
    <main
      className={cn(
        "flex h-full flex-col justify-between bg-primary transition-all ease-in-out dark:bg-slate-700 dark:text-primary md:h-screen",
        `${TYPES_PASTEL[pokemonTypes?.[0].type.name]}`,
      )}
    >
      <Header />
      {!isLoading && pokemons?.length > 0 && (
        <>
          <SearchInput
            handleOnSubmit={handleOnSubmit}
            setSearchValue={setSearchValue}
          />
          <div className="flex w-full flex-col px-16 py-4 md:flex-row">
            <div className="w-full md:grid md:grid-cols-3">
              <div className="space-y-4 md:col-span-1">
                <div>
                  {pokemons[selectedVariant]?.types.map(({ type }, index) => (
                    <Badge
                      className={cn(
                        `bg-${type.name} items-center gap-1 text-sm`,
                        index < pokemons[selectedVariant].types.length - 1 &&
                          "mr-2",
                      )}
                      key={`${pokemons[selectedVariant].id}-${type.name}`}
                    >
                      {typeIcons[type.name.toUpperCase()]}
                      {firstLetterToUpperCase(type.name)}
                    </Badge>
                  ))}
                </div>
                <div>
                  <span className="text-4xl md:text-6xl">
                    {firstLetterToUpperCase(pokemonSpecies?.name)}
                  </span>
                  <span className="text-xl">#{pokemons?.[0].id}</span>
                  {pokemons.length > 1 && (
                    <div className="my-4">
                      <Select
                        onValueChange={(value) =>
                          setSelectedVariant(
                            pokemons.findIndex(
                              (pokemon) => pokemon.name === value,
                            ),
                          )
                        }
                      >
                        <SelectTrigger className="max-w-lg">
                          <SelectValue placeholder="Select a different variety" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              {firstLetterToUpperCase(pokemonSpecies.name)}{" "}
                              varieties
                            </SelectLabel>
                            {pokemons.map((pokemon, index) => (
                              <SelectItem
                                key={pokemon.name}
                                value={pokemon.name}
                              >
                                {firstLetterToUpperCase(pokemons?.[index].name)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 md:row-span-2">
                <img
                  className="relative z-[2] max-h-[500px] w-full object-contain p-4 max-md:p-0"
                  src={
                    pokemonSprites?.other["official-artwork"].front_default ??
                    pokemonSprites?.other.dream_world.front_default
                  }
                  alt="pokemon artwork image"
                />
              </div>

              <div className="mt-4 md:grid md:grid-cols-3">
                <div className="flex flex-col gap-6 md:col-span-2">
                  {pokemonStats?.map((stat) => (
                    <div className="space-y-1" key={stat.stat.name}>
                      <StatIcon
                        name={stat.stat.name}
                        icon={stat.stat.name}
                        statValue={stat.base_stat}
                      />
                      {/* <StatBar
                        value={stat.base_stat}
                        rangeColor={getColorRange(stat.base_stat)}
                      /> */}
                      <Progress
                        className="w-3/4"
                        value={(stat.base_stat / stats.MAX_STAT_VALUE) * 100}
                      />
                    </div>
                  ))}
                  <span>
                    Total:{" "}
                    {pokemonStats?.reduce(
                      (acc, stat) => (acc += stat.base_stat),
                      0,
                    )}
                  </span>
                </div>
                <div className="flex flex-col space-y-4 space-y-reverse md:col-span-1 md:flex-col-reverse md:justify-end">
                  <div>
                    <ul>
                      <Accordion type="multiple">
                        {pokemonAbilities?.map(
                          ({ ability, is_hidden: isHidden }, index) => (
                            <AccordionItem
                              key={ability.name + index}
                              value={ability.name}
                            >
                              <AccordionTrigger>
                                <div className="flex flex-col items-start">
                                  {firstLetterToUpperCase(ability.name)}
                                  {isHidden && (
                                    <span className="text-sm">
                                      (hidden ability)
                                    </span>
                                  )}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <AbilityDetails url={ability.url} />
                              </AccordionContent>
                            </AccordionItem>
                          ),
                        )}
                      </Accordion>
                    </ul>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Ruler />
                    {pokemonHeight / 10} m
                  </div>
                  <div className="flex flex-row gap-4">
                    <Weight />
                    {pokemonWeight / 10} kg
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="px-16 py-4 md:mb-auto">
            <h2>Evolutions</h2>
            {pokemonSpecies && (
              <EvolutionChain
                pokemonSpecies={pokemonSpecies}
                setSearchValue={setSearchValue}
              />
            )}
          </div>
        </>
      )}
      {isLoading && (
        <>
          <Skeleton className="mx-16 mt-4 h-8 rounded-full md:w-[500px]" />
          <div className="space-y-4 px-16 py-4">
            <div className="gap-4 md:grid md:grid-cols-3">
              <div className="space-y-4 md:col-span-1">
                <Skeleton className="h-6 w-14 rounded-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-14 w-96 rounded-full" />
                  <Skeleton className="h-9 w-14 self-end rounded-full" />
                </div>
              </div>
              <div className="md:col-span-2 md:row-span-2">
                <Skeleton className="mx-auto md:h-96 md:w-96" />
              </div>
              <div className="mt-4 md:grid md:grid-cols-3">
                <div className="space-y-6 md:col-span-2">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-6 md:col-span-1">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-16 w-32" />
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4 px-16 py-4 md:mb-auto">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-64 w-64" />
          </div>
        </>
      )}
      <Footer />
    </main>
  )
}

export default Main

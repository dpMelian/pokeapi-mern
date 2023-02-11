import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header.tsx';
import SearchInput from './components/SearchInput.tsx';
import TypeBadge from './components/TypeBadge.tsx';
import { firstLetterToUpperCase } from './helpers/firstLetterToUpperCase.ts';
import { useGetPokemonByName } from './hooks/useGetPokemonByName.ts';
import { POKEMON_GENERATION_RANGES } from './constants/pokemonGenerations.ts';

const Container = styled.main`
  width: 80%;
  margin: 1rem auto;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LargeImage = styled.img`
  transform: scale(1.5);
  padding: 0 2rem;
`;

interface Pokemon {
  abilities: { ability: { name: string }, is_hidden: boolean }[],
  id: number,
  sprites: { versions: {}, front_default: string },
  stats: { base_stat: number, stat: { name: string } }[],
  types: { type: { name: string } }[],
  version: {},
  weight: number,
}

interface Range {
  start: number,
  end: number,
  version: string,
}

const Main = () => {
  const [searchValue, setSearchValue] = useState("pikachu");
  const [pokemonGeneration, setPokemonGeneration] = useState("generation-i");
  const [pokemonVersion, setPokemonVersion] = useState("red-blue");
  const { data, isLoading, isError } = useGetPokemonByName(searchValue) as {
    data: Pokemon | null;
    isLoading: boolean;
    isError: boolean;
  };

  const handleOnSubmit = (searchInputValue: string) => {
    setSearchValue(searchInputValue);
  }

  useEffect(() => {
    for(const [generation, range] of Object.entries(POKEMON_GENERATION_RANGES) as [string, Range][]) {
      if(data){
        if(data?.id > range.start && data?.id < range.end){
          setPokemonGeneration(generation);
          setPokemonVersion(range.version);
        }
      }
    }
  }, [data])

  return (
    <>
      <Header /> 
      <Container>
        <SearchInput handleOnSubmit={handleOnSubmit} handleOnInput={setSearchValue} />

        {isError && <p>Pokémon {searchValue} not found</p>}
        {!isError && !isLoading && (
          <>
            <h2>
              You have searched for {firstLetterToUpperCase(searchValue)}
            </h2>
            <h2>
              Sprite:
              <LargeImage
                src={data?.sprites.versions?.[pokemonGeneration][pokemonVersion].front_default}
                alt="pokemon animated sprite from fifth generation"
              />
            </h2>

            <h2>
              Abilities:
              <ul>
                {data?.abilities.map(({ability, is_hidden}) => (
                  <li key={ability.name}>{firstLetterToUpperCase(ability.name)}{is_hidden && ' - hidden ability'}</li>
                ))}
              </ul>
            </h2>

            <h2>
              Types:
              <ul>
                {data?.types.map(({ type }) => (
                  <TypeBadge type={type.name} />
                ))}
              </ul>
            </h2>

            <h2>
              Stats:
              <ul>
                {data?.stats.map((stat, index) => (
                  <li key={`${stat}-${index}`}>{`${firstLetterToUpperCase(stat.stat.name)}: ${stat.base_stat}`}</li>
                ))}
              </ul>
            </h2>

            <h2>
              Weight: {data?.weight}
            </h2>
          </>
        )}
        {!isError && isLoading && (
          <Loading>
            <FontAwesomeIcon icon={faMagnifyingGlass} bounce size="3x" />
            <span>Searching Pokémon <strong>{firstLetterToUpperCase(searchValue)}</strong>...</span>
          </Loading>
        )}
      </Container>
    </>
  );
}

export default Main;

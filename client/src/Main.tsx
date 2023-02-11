import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header.tsx';
import SearchInput from './components/SearchInput.tsx';
import TypeBadge from './components/TypeBadge.tsx';
import { firstLetterToUpperCase } from './helpers/firstLetterToUpperCase.ts';
import { useGetPokemonByName } from './hooks/useGetPokemonByName.ts';

const Container = styled.main`
  width: 80%;
  margin: 1rem auto;
`;

interface Pokemon {
  abilities: { ability: { name: string }, is_hidden: boolean }[],
  sprites: { front_default: string },
  stats: { base_stat: number, stat: { name: string } }[],
  types: { type: { name: string } }[],
  weight: number,
}

const Main = () => {
  const [searchValue, setSearchValue] = useState("pikachu");
  const { data, isLoading } = useGetPokemonByName(searchValue) as {
    data: Pokemon | null;
    isLoading: boolean;
  };

  const handleOnSubmit = (searchInputValue: string) => {
    setSearchValue(searchInputValue);
  }

  return (
    <>
      <Header />
      <Container>
        <SearchInput handleOnSubmit={handleOnSubmit} handleOnInput={setSearchValue} />

        <h2>
          You have searched for {firstLetterToUpperCase(searchValue)}
        </h2>

        <h2>
          Sprite:
          {isLoading ? <FontAwesomeIcon icon={faSpinner} /> : <img src={data?.sprites.front_default} alt="pokemon sprite"/>}
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
      </Container>
    </>
  );
}

export default Main;

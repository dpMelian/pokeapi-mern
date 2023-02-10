import { useState } from 'react';
import Header from './components/Header.tsx';
import SearchInput from './components/SearchInput.tsx';
import { firstLetterToUpperCase } from './helpers/firstLetterToUpperCase.ts';
import { useGetPokemonByName } from './hooks/useGetPokemonByName.ts';
import './App.css';

const App = () => {
  const [searchValue, setSearchValue] = useState("pikachu");
  const { data } = useGetPokemonByName(searchValue);

  const handleOnSubmit = (searchInputValue) => {
    setSearchValue(searchInputValue);
  }

  return (
    <>
      <Header />
      <SearchInput handleOnSubmit={handleOnSubmit} handleOnInput={setSearchValue} />

      <h2>
        You have searched for {searchValue}
      </h2>

      <h2>
        Sprite:
        <img src={data?.sprites.front_default} alt="pokemon sprite"/>
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
          {data?.types.map(({type}) => (
            <li key={type.name}>{type.name}</li>
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
  );
}

export default App;

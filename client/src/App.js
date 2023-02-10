import { useState } from 'react';
import Header from './components/Header.tsx';
import SearchInput from './components/SearchInput.tsx';
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
          {data?.abilities.map(({ability}) => (
            <li key={ability.name}>{ability.name}</li>
          ))}
        </ul>
      </h2>
    </>
  );
}

export default App;

import './App.css';
import Header from './components/Header.tsx';
import { useGetPokemonByName } from './hooks/useGetPokemonByName.ts';

const App = () => {
  const { data } = useGetPokemonByName('pikachu')
  console.log(data)

  return (
    <>
      <Header />
      <p>
        Sprite:
        <img src={data?.sprites.front_default} alt="pokemon sprite"/>
      </p>

      <p>
        Abilities:
        <ul>
          {data?.abilities.map(({ability}) => (
          <li>{ability.name}</li>
          ))}
        </ul>
      </p>
    </>
  );
}

export default App;

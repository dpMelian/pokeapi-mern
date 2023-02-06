import './App.css';
import { useGetPokemonByName } from './hooks/useGetPokemonByName.ts';

const App = () => {
  const { data } = useGetPokemonByName('ditto')
  console.log(data)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        PokéAPI using MERN stack + TailwindCSS
      </h1>

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

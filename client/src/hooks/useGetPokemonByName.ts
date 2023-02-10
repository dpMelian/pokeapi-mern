import axios from 'axios'
import { useQuery } from 'react-query'
import { pokeApiBaseUrl } from '../constants/baseUrls.ts';

export const useGetPokemonByName = (name: string) => 
  useQuery(['getPokemonByName', name], async () => axios.get(`${pokeApiBaseUrl}/pokemon/${name}`), {select: data => data.data})

export interface Pokemon {
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>
  height: number
  id: number
  sprites: {
    versions: Record<string, Record<string, { front_default: string }>>
  }
  stats: Array<{ base_stat: number; stat: { name: string } }>
  types: Array<{ type: { name: string } }>
  weight: number
}

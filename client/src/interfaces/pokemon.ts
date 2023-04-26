export interface Pokemon {
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>
  height: number
  name: string
  id: number
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
      "official-artwork": {
        front_default: string
      }
    }
    versions: Record<string, Record<string, { front_default: string }>>
  }
  stats: Array<{ base_stat: number; stat: { name: string } }>
  types: Array<{ type: { name: string } }>
  weight: number
}

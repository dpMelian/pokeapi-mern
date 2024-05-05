// Reference - https://pokeapi.co/docs/v2#common-models

export type NamedAPIResource = {
  name: string
  url: string
}

export type APIResource = {
  url: string
}

export type GenerationGameIndex = {
  game_index: number
  generation: NamedAPIResource
}

export type MachineVersionDetail = {
  machine: APIResource
  version_group: NamedAPIResource
}

export type Name = {
  name: string
  language: NamedAPIResource
}

export type VerboseEffect = {
  effect: string
  short_effect: string
  language: NamedAPIResource
}

export type VersionGroupFlavorText = {
  text: string
  language: NamedAPIResource
  version_group: NamedAPIResource
}

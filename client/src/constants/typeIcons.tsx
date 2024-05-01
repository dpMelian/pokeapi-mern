import {
  Biohazard,
  Bolt,
  Bug,
  Castle,
  Circle,
  Droplet,
  Eye,
  Feather,
  Flame,
  Ghost,
  Grab,
  Hexagon,
  Leaf,
  Mountain,
  Shovel,
  Snowflake,
  Sparkle,
  Zap,
} from "lucide-react"

export const typeIcons = {
  NORMAL: <Circle />,
  FIRE: <Flame />,
  WATER: <Droplet />,
  GRASS: <Leaf />,
  ELECTRIC: <Zap />,
  ICE: <Snowflake />,
  FIGHTING: <Grab />,
  POISON: <Biohazard />,
  GROUND: <Shovel />,
  FLYING: <Feather />,
  PSYCHIC: <Hexagon />,
  BUG: <Bug />,
  ROCK: <Mountain />,
  GHOST: <Ghost />,
  DARK: <Eye />,
  DRAGON: <Castle />,
  STEEL: <Bolt />,
  FAIRY: <Sparkle />,
} as any
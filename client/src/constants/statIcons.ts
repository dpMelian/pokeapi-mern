import {
  IconHeartFilled,
  IconSword,
  IconShield,
  IconWand,
  IconShieldCheckered,
  IconWind,
  type TablerIconsProps,
} from "@tabler/icons-react"

export const STAT_ICONS: Record<
  string,
  (props: TablerIconsProps) => JSX.Element
> = {
  hp: IconHeartFilled,
  attack: IconSword,
  defense: IconShield,
  "special-attack": IconWand,
  "special-defense": IconShieldCheckered,
  speed: IconWind,
}

import { BugIcon } from "@/components/icons/pokemon-types/BugIcon"
import { DarkIcon } from "@/components/icons/pokemon-types/DarkIcon"
import { DragonIcon } from "@/components/icons/pokemon-types/DragonIcon"
import { ElectricIcon } from "@/components/icons/pokemon-types/ElectricIcon"
import { FairyIcon } from "@/components/icons/pokemon-types/FairyIcon"
import { FightingIcon } from "@/components/icons/pokemon-types/FightingIcon"
import { FireIcon } from "@/components/icons/pokemon-types/FireIcon"
import { FlyingIcon } from "@/components/icons/pokemon-types/FlyingIcon"
import { GhostIcon } from "@/components/icons/pokemon-types/GhostIcon"
import { GrassIcon } from "@/components/icons/pokemon-types/GrassIcon"
import { GroundIcon } from "@/components/icons/pokemon-types/GroundIcon"
import { IceIcon } from "@/components/icons/pokemon-types/IceIcon"
import { NormalIcon } from "@/components/icons/pokemon-types/NormalIcon"
import { PoisonIcon } from "@/components/icons/pokemon-types/PoisonIcon"
import { PsychicIcon } from "@/components/icons/pokemon-types/PsychicIcon"
import { RockIcon } from "@/components/icons/pokemon-types/RockIcon"
import { SteelIcon } from "@/components/icons/pokemon-types/SteelIcon"
import { WaterIcon } from "@/components/icons/pokemon-types/WaterIcon"

const ICON_SIZE = "size-6"

export const TYPE_ICONS = {
  BUG: <BugIcon className={ICON_SIZE} />,
  DARK: <DarkIcon className={ICON_SIZE} />,
  DRAGON: <DragonIcon className={ICON_SIZE} />,
  ELECTRIC: <ElectricIcon className={ICON_SIZE} />,
  FAIRY: <FairyIcon className={ICON_SIZE} />,
  FIGHTING: <FightingIcon className={ICON_SIZE} />,
  FIRE: <FireIcon className={ICON_SIZE} />,
  FLYING: <FlyingIcon className={ICON_SIZE} />,
  GHOST: <GhostIcon className={ICON_SIZE} />,
  GRASS: <GrassIcon className={ICON_SIZE} />,
  GROUND: <GroundIcon className={ICON_SIZE} />,
  ICE: <IceIcon className={ICON_SIZE} />,
  NORMAL: <NormalIcon className={ICON_SIZE} />,
  POISON: <PoisonIcon className={ICON_SIZE} />,
  PSYCHIC: <PsychicIcon className={ICON_SIZE} />,
  ROCK: <RockIcon className={ICON_SIZE} />,
  STEEL: <SteelIcon className={ICON_SIZE} />,
  WATER: <WaterIcon className={ICON_SIZE} />,
} as Record<string, JSX.Element>

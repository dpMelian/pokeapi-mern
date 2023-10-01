import React from "react"
import styled, { type DefaultTheme, useTheme } from "styled-components"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"
import { TYPES } from "../constants/pokemonTypes"
import { cn } from "../helpers/cn"

interface MyTheme extends DefaultTheme {
  "primary--darker": string
}

interface BadgeTextProps {
  color: string
}

const BadgeText = styled.span<BadgeTextProps>`
  color: ${(props) => props.color};
  font-family: "Kadwa";
`

interface Props {
  type: string
}

const TypeBadge = ({ type }: Props): JSX.Element => {
  const theme = useTheme() as MyTheme
  const rgb = hexToRgb(TYPES[type])
  let textColor = theme["primary--darker"]

  if (rgb != null) {
    const brightness = Math.round(
      (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    )
    textColor = brightness > 125 ? theme["primary--darker"] : "white"
  }

  return (
    <h3
      className={cn(
        "rounded-[5px] border-2 border-solid inline-block py-0 px-4 text-center w-[120px]",
        "bg-" + type
      )}
      key={type}
    >
      <BadgeText color={textColor}>{firstLetterToUpperCase(type)}</BadgeText>
    </h3>
  )
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result != null
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export default TypeBadge

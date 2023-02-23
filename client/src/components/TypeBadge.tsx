import React from "react"
import styled, { type DefaultTheme, useTheme } from "styled-components"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"
import { TYPES } from "../constants/pokemonTypes"

interface MyTheme extends DefaultTheme {
  "primary--darker": string
}

interface BadgeProps {
  type: string
}

interface BadgeTextProps {
  color: string
}

const Badge = styled.h3<BadgeProps>`
  background-color: ${(props) => TYPES[props.type]};
  border-radius: 5px;
  border: 2px solid;
  display: inline-block;
  font-family: "Kadwa";
  padding: 0 1rem;
  text-align: center;
  width: 120px;
`

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
    <Badge key={type} type={type}>
      <BadgeText color={textColor}>{firstLetterToUpperCase(type)}</BadgeText>
    </Badge>
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

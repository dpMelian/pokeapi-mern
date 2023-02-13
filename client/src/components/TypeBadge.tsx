import React from "react"
import styled from "styled-components"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"
import { TYPES } from "../constants/pokemonTypes"

interface BadgeProps {
  type: string
}

const Badge = styled.span<BadgeProps>`
  border: 2px solid;
  border-radius: 5px;
  background-color: ${(props) => TYPES[props.type]};
  padding: 0 1rem;
  display: inline-block;
  text-align: center;
  width: 120px;
`

interface Props {
  type: string
}

const TypeBadge = ({ type }: Props): JSX.Element => (
  <Badge key={type} type={type}>
    {firstLetterToUpperCase(type)}
  </Badge>
)

export default TypeBadge

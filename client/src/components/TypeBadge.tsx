import React from "react"
import styled from "styled-components"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"
import { TYPES } from "../constants/pokemonTypes"

interface BadgeProps {
  type: string
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

interface Props {
  type: string
}

const TypeBadge = ({ type }: Props): JSX.Element => (
  <Badge key={type} type={type}>
    {firstLetterToUpperCase(type)}
  </Badge>
)

export default TypeBadge

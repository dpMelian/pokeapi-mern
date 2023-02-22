import React from "react"
import styled from "styled-components"
import { STAT_ICONS } from "../constants/statIcons"

interface Props {
  name: string
  icon: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Span = styled.span`
  font-family: Kadwa;
`

const StatIcon = ({ name, icon }: Props): JSX.Element => (
  <Container>
    {React.createElement(STAT_ICONS[icon], null)}
    {<Span>{name.toUpperCase()}</Span>}
  </Container>
)

export default StatIcon

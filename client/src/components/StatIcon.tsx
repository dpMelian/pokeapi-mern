import React from "react"
import styled from "styled-components"
import { STAT_ICONS } from "../constants/statIcons"

interface Props {
  name: string
  icon: string
  children: JSX.Element
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`

const Span = styled.span`
  align-items: center;
  display: flex;
  font-family: Kadwa;
`

const StatIcon = ({ name, icon, children }: Props): JSX.Element => (
  <Container>
    {
      <Span>
        {React.createElement(STAT_ICONS[icon], null)}
        {name.toUpperCase()}
      </Span>
    }
    {children}
  </Container>
)

export default StatIcon

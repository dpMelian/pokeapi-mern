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

const StatIcon = ({ name, icon }: Props): JSX.Element => (
  <Container>
    {React.createElement(STAT_ICONS[icon], null)}
    {<h3>{name.toUpperCase()}</h3>}
  </Container>
)

export default StatIcon

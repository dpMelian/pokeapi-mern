import React from "react"
import styled, { type ThemedStyledProps } from "styled-components"

interface Props {
  value: number
  rangeColor: string
}

interface BarProps {
  value: number
  rangeColor: string
}

const MAX_STAT_VALUE = 255
const MAX_BAR_WIDTH_PERCENTAGE = 100

const Bar = styled.span<BarProps>`
  display: flex;
  border: 2px solid;
  border-radius: 5px;
  background-color: ${(props: ThemedStyledProps<BarProps, any>) =>
    props.rangeColor};
  width: ${(props) =>
    `calc(${props.value / MAX_STAT_VALUE} * ${MAX_BAR_WIDTH_PERCENTAGE}%)`};
  height: 20px;
`

const StatBar = ({ value, rangeColor }: Props): JSX.Element => (
  <Bar value={value} rangeColor={rangeColor} />
)

export default StatBar

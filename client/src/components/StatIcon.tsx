import React from "react"
import { STAT_ICONS } from "../constants/statIcons"

interface Props {
  name: string
  icon: string
  statValue: number
}

const StatIcon = ({ name, icon, statValue }: Props): JSX.Element => (
  <div className="flex items-center gap-4">
    <div className="flex items-center">
      {React.createElement(STAT_ICONS[icon], null)}
      {name.toUpperCase()}
    </div>
    <div>{statValue}</div>
  </div>
)

export default StatIcon

import React from "react"
import { STAT_ICONS } from "../constants/statIcons"

interface Props {
  name: string
  icon: string
  statValue: number
  children: JSX.Element
}

const StatIcon = ({ name, icon, statValue, children }: Props): JSX.Element => (
  <div className="grid grid-cols-3 items-center gap-4">
    <div className="col-span-1 flex items-center justify-between">
      <div className="flex items-center">
        {React.createElement(STAT_ICONS[icon], null)}
        {name.toUpperCase()}
      </div>
      <div>{statValue}</div>
    </div>

    <div className="col-span-2 flex items-center">{children}</div>
  </div>
)

export default StatIcon

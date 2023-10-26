import React from "react"

import { cn } from "../helpers/cn"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"

interface Props {
  type: string
}

const TypeBadge = ({ type }: Props): JSX.Element => (
  <h3
    className={cn(
      "inline-block w-[120px] rounded-[5px] border-2 border-solid px-4 py-0 text-center",
      "bg-" + type,
    )}
    key={type}
  >
    <span>{firstLetterToUpperCase(type)}</span>
  </h3>
)

export default TypeBadge

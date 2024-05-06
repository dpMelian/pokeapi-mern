import useGetItem from "@/hooks/useGetItem"
import { EvolutionDetails } from "@/types/evolution/evolutionChain"
import { NamedAPIResource } from "@/types/utility/commonModels"
import { firstLetterToUpperCase } from "../helpers/firstLetterToUpperCase"
import { snakeOrKebabCaseToPlainText } from "../helpers/snakeOrKebabCaseToPlainText"
import { Item } from "@/types/items/item"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

const formatEvolutionDetailValue = (
  value: string | number | boolean | NamedAPIResource,
) => {
  if ((value as NamedAPIResource)?.name) {
    return firstLetterToUpperCase(
      snakeOrKebabCaseToPlainText({ str: (value as NamedAPIResource).name }),
    )
  }

  if (typeof value === "boolean") {
    return
  }

  return value?.toString()
}

export const FormatEvolutionDetail = ({
  objectKey,
  value,
}: {
  objectKey: keyof EvolutionDetails
  value: string | number | boolean | NamedAPIResource
}) => {
  let data: Item | undefined

  if (objectKey === "item" || objectKey === "held_item") {
    data = useGetItem((value as NamedAPIResource).name).data

    return (
      <span className="flex items-center" key={objectKey}>
        {firstLetterToUpperCase(
          snakeOrKebabCaseToPlainText({ str: objectKey }),
        )}
        :
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <img
                alt={firstLetterToUpperCase(
                  snakeOrKebabCaseToPlainText({
                    str: data?.name || "item sprite",
                  }),
                )}
                src={data?.sprites.default}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {firstLetterToUpperCase(
                  snakeOrKebabCaseToPlainText({ str: data?.name || "" }),
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    )
  }

  return (
    <span key={objectKey}>
      {firstLetterToUpperCase(snakeOrKebabCaseToPlainText({ str: objectKey }))}:{" "}
      {formatEvolutionDetailValue(value)}
    </span>
  )
}

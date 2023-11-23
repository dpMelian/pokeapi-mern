import { useState } from "react"
import { useGetAbilityDetails } from "../hooks/useGetAbilityDetails"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

type Props = {
  url: string
}

const AbilityDetails = ({ url }: Props) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false)
  const { data: selectedAbilityDetails } = useGetAbilityDetails(url)

  return (
    <div className="flex flex-col">
      <Button
        className="w-fit dark:text-white"
        variant="link"
        onClick={() => {
          setAreDetailsVisible(!areDetailsVisible)
        }}
      >
        Show More
        <ChevronDown />
      </Button>
      {areDetailsVisible && (
        <p className="text-sm">
          {selectedAbilityDetails?.effect_entries.map((ability) => {
            if (ability.language.name === "en") {
              return ability.short_effect
            }
          })}
        </p>
      )}
    </div>
  )
}

export default AbilityDetails

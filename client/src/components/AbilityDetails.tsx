import { useGetAbilityDetails } from "../hooks/useGetAbilityDetails"

type Props = {
  url: string
}

const AbilityDetails = ({ url }: Props) => {
  const { data: selectedAbilityDetails } = useGetAbilityDetails(url)

  return (
    <>
      {selectedAbilityDetails?.effect_entries.map((ability) => {
        if (ability.language.name === "en") {
          return ability.short_effect
        }
      })}
    </>
  )
}

export default AbilityDetails

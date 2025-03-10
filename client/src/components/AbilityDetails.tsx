import { useTranslation } from "react-i18next"

import { useGetAbilityDetails } from "../hooks/useGetAbilityDetails"

type Props = {
  url: string
}

const AbilityDetails = ({ url }: Props) => {
  const { t } = useTranslation()

  const { data: selectedAbilityDetails, isLoading } = useGetAbilityDetails(url)

  if (isLoading) return <p>{t("loading")}...</p>

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

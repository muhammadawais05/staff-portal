import { titleize } from '@staff-portal/string'
import { useGetTalentTypes } from '@staff-portal/verticals'
import { useMemo } from 'react'

export const useGetJobTypes = () => {
  const {
    talentTypesWithSpecializations: talentTypes,
    loading: loadingJobTypesOptions
  } = useGetTalentTypes()

  const jobTypesOptions = useMemo(() => {
    if (!talentTypes) {
      return []
    }

    return talentTypes
      .map(({ talentType, specializations }) => ({
        id: talentType,
        label: titleize(talentType),
        children: specializations.nodes
          .map(({ id, title }) => ({
            id,
            label: title
          }))
          .sort((firstItem, secondItem) =>
            firstItem.label.localeCompare(secondItem.label)
          )
      }))
      .sort((firstItem, secondItem) =>
        firstItem.label.localeCompare(secondItem.label)
      )
  }, [talentTypes])

  return { loadingJobTypesOptions, jobTypesOptions }
}

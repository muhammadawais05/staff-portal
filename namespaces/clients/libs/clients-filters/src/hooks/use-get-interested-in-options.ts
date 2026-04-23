import { useMemo } from 'react'
import { useGetUserVerticals } from '@staff-portal/verticals'
import pluralize from 'pluralize'

export const useGetInterestedInOptions = () => {
  const { options, loading } = useGetUserVerticals({
    variables: {
      filter: {
        withPseudo: true
      }
    },
    optionsValueKey: 'talentType'
  })

  const interestedInOptions = useMemo(
    () =>
      options.map(option => ({
        label: option.text,
        value: pluralize(option.value)
      })),
    [options]
  )

  return { interestedInOptions, loading }
}

import { useGetInfractionTalent } from '../../data'

interface AutocompleteLabel {
  label: string | undefined
  loading: boolean
}

export const useGetTalentFilterAutocompleteLabel = (
  filterValue: string | undefined
): AutocompleteLabel => {
  const { data, loading } = useGetInfractionTalent({
    talentId: filterValue as string,
    skip: !filterValue
  })

  return { loading, label: data?.fullName }
}

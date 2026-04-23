import { useGetRateChangeRequestClaimerUser } from '../../data'

interface AutocompleteLabel {
  label: string | undefined
  loading: boolean
}

export const useGetRateChangeRequestClaimerFilterAutocompleteLabel = (
  filterValue: string | undefined
): AutocompleteLabel => {
  const { data, loading } = useGetRateChangeRequestClaimerUser({
    staffId: filterValue as string,
    skip: !filterValue
  })

  return { loading, label: data?.fullName }
}

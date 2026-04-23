import { useGetInfractionsStaffUser } from '../../data'

interface AutocompleteLabel {
  label: string | undefined
  loading: boolean
}

export const useGetInfractionStaffFilterAutocompleteLabel = (
  filterValue: string | undefined
): AutocompleteLabel => {
  const { data, loading } = useGetInfractionsStaffUser({
    staffId: filterValue as string,
    skip: !filterValue
  })

  return { loading, label: data?.fullName }
}

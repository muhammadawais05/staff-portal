import { useGetInfractionClient } from '../../data'

interface AutocompleteLabel {
  label: string | undefined
  loading: boolean
}

export const useGetCompanyFilterAutocompleteLabel = (
  filterValue: string | undefined
): AutocompleteLabel => {
  const { data, loading } = useGetInfractionClient({
    companyId: filterValue as string,
    skip: !filterValue
  })

  return { loading, label: data?.fullName }
}

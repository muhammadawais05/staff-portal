import { useGetClientAutocomplete } from './get-client-autocomplete.staff.gql'

export const useGetStaffFilterAutocompleteLabel = (
  filterValue: string | undefined
) => {
  const { data, ...restOptions } = useGetClientAutocomplete({
    clientId: filterValue as string,
    skip: !filterValue
  })

  return { ...restOptions, label: data?.fullName }
}

import { useGetStaffUser } from './data'

export const useGetStaffFilterAutocompleteLabel = (
  filterValue: string | undefined
) => {
  const { data, ...restOptions } = useGetStaffUser({
    staffId: filterValue as string,
    skip: !filterValue
  })

  return { ...restOptions, label: data?.fullName }
}

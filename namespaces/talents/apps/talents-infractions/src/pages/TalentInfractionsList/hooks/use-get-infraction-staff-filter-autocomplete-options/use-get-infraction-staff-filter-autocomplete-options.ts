import { useGetInfractionStaffAutocomplete } from '../../data'

export const useGetInfractionStaffFilterAutocompleteOptions = () => {
  const { getUsers, data, ...restOptions } = useGetInfractionStaffAutocomplete()

  return { ...restOptions, getOptions: getUsers, options: data }
}

import { useGetTaskStaffAutocomplete } from '@staff-portal/tasks'

export const useGetStaffFilterAutocompleteOptions = () => {
  const { getUsers, data, ...restOptions } = useGetTaskStaffAutocomplete()

  return { ...restOptions, getOptions: getUsers, options: data }
}

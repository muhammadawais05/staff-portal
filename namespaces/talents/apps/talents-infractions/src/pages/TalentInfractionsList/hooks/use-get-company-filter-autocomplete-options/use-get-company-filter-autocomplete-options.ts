import { useGetClientAutocomplete } from '@staff-portal/clients'

export const useGetCompanyFilterAutocompleteOptions = () => {
  const { getClients, data, ...restOptions } = useGetClientAutocomplete()

  return { ...restOptions, getOptions: getClients, options: data }
}

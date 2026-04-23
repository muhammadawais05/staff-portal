import { useGetClientAutocomplete } from '@staff-portal/clients'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

export const useGetStaffFilterAutocompleteOptions = () => {
  const { getClients, data, ...restOptions } = useGetClientAutocomplete(
    AutocompleteModels.ACTIVE_OR_WITH_INVOICES_CLIENTS
  )

  return { ...restOptions, getOptions: getClients, options: data }
}

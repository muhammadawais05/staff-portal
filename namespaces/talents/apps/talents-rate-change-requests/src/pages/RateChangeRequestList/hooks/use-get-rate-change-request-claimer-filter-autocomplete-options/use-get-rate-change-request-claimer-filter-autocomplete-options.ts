import { useGetRateChangeRequestClaimerAutocomplete } from '../../data'

export const useGetRateChangeRequestClaimerFilterAutocompleteOptions = () => {
  const { getUsers, data, ...restOptions } =
    useGetRateChangeRequestClaimerAutocomplete()

  return { ...restOptions, getOptions: getUsers, options: data }
}

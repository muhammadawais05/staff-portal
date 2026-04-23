import { useGetTalentAutocomplete } from '@staff-portal/talents'

export const useGetTalentFilterAutocompleteOptions = () => {
  const { getTalents, data, ...restOptions } = useGetTalentAutocomplete()

  return { ...restOptions, getOptions: getTalents, options: data }
}

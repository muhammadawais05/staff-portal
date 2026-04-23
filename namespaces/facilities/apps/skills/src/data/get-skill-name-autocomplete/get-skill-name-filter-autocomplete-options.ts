import { useGetSkillNamesAutocomplete } from './index'

export const useGetSkillNameFilterAutocompleteOptions = () => {
  const { getSkillNames, data, ...restOptions } = useGetSkillNamesAutocomplete()

  return { ...restOptions, getOptions: getSkillNames, options: data }
}

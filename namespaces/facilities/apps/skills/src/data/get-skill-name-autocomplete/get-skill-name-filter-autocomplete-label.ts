import { useGetSkillNameAutocompleteLabel } from './index'

export const useGetSkillNameFilterAutocompleteLabel = (
  filterValue: string | undefined
) => {
  const { data, ...restOptions } = useGetSkillNameAutocompleteLabel({
    skillNameId: filterValue as string,
    skip: !filterValue
  })

  return { ...restOptions, label: data?.name }
}

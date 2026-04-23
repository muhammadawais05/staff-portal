import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'
import { FilterConfigType } from '@staff-portal/filters'
import { splitByColumns } from '@staff-portal/utils'

import { EXTRA_USER_OPTIONS } from '../config'
import { useGetVerticalsWithMatchers } from '../data/get-verticals-with-matchers.staff.gql'

export const useMatchersFilters = () => {
  const { options, loading: loadingMatchers } = useGetVerticalsWithMatchers()

  const matchersFilters = options.map(vertical => ({
    type: FilterConfigType.SELECT,
    label: `${vertical.name} matcher`,
    subCategoryName: vertical.talentType,
    name: 'talent_matchers',
    options: [...EXTRA_USER_OPTIONS, ...vertical.clientMatchers],
    loading: loadingMatchers,
    enableReset: true,
    placeholder: NOT_SELECTED_PLACEHOLDER
  }))

  return splitByColumns(matchersFilters, 2)
}

import React, { useMemo } from 'react'
import {
  useGetLanguagesSearchCategory,
  createMultiAutocompleteCategory,
  MultiAutocompleteSearchBarCategory
} from '@staff-portal/filters'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'

import { StaffAutocompleteEdgeFragment } from '../../data/staff-autocomplete-edge-fragment/staff-autocomplete-edge-fragment.staff.gql.types'
import getStaffKeywordsAutocomplete from '../get-staff-keywords-autocomplete/get-staff-keywords-autocomplete'
import useGetStaffNamesAutocompleteSearchCategory from '../use-get-staff-names-autocomplete-search-category/use-get-staff-names-autocomplete-search-category'

const useGetStaffKeywordsAutocompleteSearchCategory = () => {
  const languagesSearchCategory = useGetLanguagesSearchCategory()
  const staffNamesAutocompleteSearchCategory =
    useGetStaffNamesAutocompleteSearchCategory()

  const staffKeywordsAutocompleteSearchCategory: MultiAutocompleteSearchBarCategory<
    string,
    StaffAutocompleteEdgeFragment
  > = useMemo(
    () =>
      createMultiAutocompleteCategory({
        numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
        name: 'keywords',
        toQueryParam: value => value,
        fromQueryParam: value => value,
        getKey: value => value,
        fromOption: ({ label, entityType }) => {
          const value = label || ''

          if (entityType === 'role') {
            return { category: staffNamesAutocompleteSearchCategory, value }
          }

          if (entityType === 'language') {
            return { category: languagesSearchCategory, value }
          }

          return { category: staffKeywordsAutocompleteSearchCategory, value }
        },
        getOptions: getStaffKeywordsAutocomplete,
        getOptionKey: ({ key }) => key,
        renderOption: ({ label, labelHighlight, nodeTypes }) => (
          <AutocompleteHighlightOption
            label={label}
            labelHighlight={labelHighlight}
            nodeTypes={nodeTypes}
            titleCase
          />
        ),
        fromInputValue: value => value,
        getBadgeLabel: value => value
      }),
    [languagesSearchCategory, staffNamesAutocompleteSearchCategory]
  )

  return staffKeywordsAutocompleteSearchCategory
}

export default useGetStaffKeywordsAutocompleteSearchCategory

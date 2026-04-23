import React, { useMemo } from 'react'
import {
  getSearchBarLanguagesAutocomplete,
  LanguagesEdgeFragment
} from '@staff-portal/languages'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'

import { createAutocompleteCategory } from '../../utils'

const useGetLanguagesSearchCategory = () =>
  useMemo(
    () =>
      createAutocompleteCategory<string, LanguagesEdgeFragment>({
        numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
        name: 'languages',
        toQueryParam: value => value,
        fromQueryParam: value => value,
        fromOption: ({ label }) => label || '',
        getKey: value => value,
        getOptions: getSearchBarLanguagesAutocomplete,
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
    []
  )

export default useGetLanguagesSearchCategory

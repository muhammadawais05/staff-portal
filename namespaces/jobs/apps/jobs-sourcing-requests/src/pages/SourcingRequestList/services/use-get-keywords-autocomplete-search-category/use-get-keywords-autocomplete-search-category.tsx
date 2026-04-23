import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { createAutocompleteCategory } from '@staff-portal/filters'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import React, { useMemo } from 'react'

import { getSourcingRequestsByKeywordsAutocomplete } from '../../data/get-sourcing-requests-by-keywords-autocomplete/get-sourcing-requests-by-keywords-autocomplete.staff.gql'
import { SourcingRequestsKeywordFragment } from '../../data/get-sourcing-requests-by-keywords-autocomplete/get-sourcing-requests-by-keywords-autocomplete.staff.gql.types'

export const useGetKeywordsAutocompleteSearchCategory = () =>
  useMemo(
    () =>
      createAutocompleteCategory<string, SourcingRequestsKeywordFragment>({
        numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
        name: 'keywords',
        toQueryParam: value => value,
        fromQueryParam: value => value,
        fromOption: ({ label }) => label || '',
        getKey: value => value,
        getOptions: getSourcingRequestsByKeywordsAutocomplete,
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

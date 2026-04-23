import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { createAutocompleteCategory } from '@staff-portal/filters'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import React, { useMemo } from 'react'

import { getSourcingRequestsByNameAutocomplete } from '../../data/get-sourcing-requests-by-names-autocomplete/get-sourcing-requests-by-names-autocomplete.staff.gql'
import { SourcingRequestsNameEdgeFragment } from '../../data/get-sourcing-requests-by-names-autocomplete/get-sourcing-requests-by-names-autocomplete.staff.gql.types'

export const useGetNamesAutocompleteSearchCategory = () =>
  useMemo(
    () =>
      createAutocompleteCategory<string, SourcingRequestsNameEdgeFragment>({
        numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
        name: 'names',
        toQueryParam: value => value,
        fromQueryParam: value => value,
        fromOption: ({ label }) => label || '',
        getKey: value => value,
        getOptions: getSourcingRequestsByNameAutocomplete,
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

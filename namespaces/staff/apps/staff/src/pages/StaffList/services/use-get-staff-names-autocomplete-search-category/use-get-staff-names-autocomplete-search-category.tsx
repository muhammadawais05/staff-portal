import React, { useMemo } from 'react'
import { createAutocompleteCategory } from '@staff-portal/filters'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'

import { StaffAutocompleteEdgeFragment } from '../../data/staff-autocomplete-edge-fragment/staff-autocomplete-edge-fragment.staff.gql.types'
import { getStaffAutocomplete } from '../../data/get-staff-autocomplete/get-staff-autocomplete.staff.gql'

const useGetStaffNamesAutocompleteSearchCategory = () =>
  useMemo(
    () =>
      createAutocompleteCategory<string, StaffAutocompleteEdgeFragment>({
        numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
        name: 'names',
        toQueryParam: value => value,
        fromQueryParam: value => value,
        getKey: value => value,
        fromOption: ({ label }) => label || '',
        getOptions: getStaffAutocomplete,
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

export default useGetStaffNamesAutocompleteSearchCategory

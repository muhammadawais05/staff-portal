import React, { useMemo } from 'react'
import { createAutocompleteCategory } from '@staff-portal/filters'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'

import { getTeamMembersAutocomplete } from '../get-team-members-autocomplete/get-team-members-autocomplete.staff.gql'
import { TeamMembersAutocompleteEdgeFragment } from '../get-team-members-autocomplete/get-team-members-autocomplete.staff.gql.types'

export const useGetTeamMembersAutocompleteSearchCategory = () =>
  useMemo(
    () =>
      createAutocompleteCategory<string, TeamMembersAutocompleteEdgeFragment>({
        numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
        name: 'keywords',
        toQueryParam: value => value,
        fromQueryParam: value => value,
        getKey: value => value,
        fromOption: ({ label }) => label || '',
        getOptions: getTeamMembersAutocomplete,
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

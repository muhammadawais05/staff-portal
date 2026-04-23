import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { createAutocompleteCategory } from '@staff-portal/filters'
import {
  getSearchBarSkillsAutocomplete,
  SearchBarSkillAutocompleteEdgeFragment
} from '@staff-portal/skills'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import React, { useMemo } from 'react'

export const useGetSkillsAutocompleteSearchCategory = () =>
  useMemo(
    () =>
      createAutocompleteCategory<
        string,
        SearchBarSkillAutocompleteEdgeFragment
      >({
        numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
        name: 'skills',
        toQueryParam: value => value,
        fromQueryParam: value => value,
        fromOption: ({ label }) => label || '',
        getKey: value => value,
        getOptions: getSearchBarSkillsAutocomplete,
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

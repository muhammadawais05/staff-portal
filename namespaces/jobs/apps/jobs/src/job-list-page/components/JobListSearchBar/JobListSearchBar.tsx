import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  createAutocompleteCategory,
  SearchBar,
  SearchBarCategories
} from '@staff-portal/filters'
import {
  SearchBarSkillAutocompleteEdgeFragment,
  getSearchBarSkillsAutocomplete
} from '@staff-portal/skills'
import { getSearchBarLanguagesAutocomplete } from '@staff-portal/languages'

import {
  getJobsByNameAutocomplete,
  getJobsByKeywordsAutocomplete
} from './data'

export const searchBarCategories: SearchBarCategories = [
  createAutocompleteCategory<string, SearchBarSkillAutocompleteEdgeFragment>({
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
  createAutocompleteCategory<string, SearchBarSkillAutocompleteEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'keywords',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getJobsByKeywordsAutocomplete,
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
  createAutocompleteCategory<string, SearchBarSkillAutocompleteEdgeFragment>({
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
  createAutocompleteCategory<string, SearchBarSkillAutocompleteEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'names',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getJobsByNameAutocomplete,
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
  })
]

interface Props {
  nestableControls: ReactNode
}

const JobListSearchBar = ({ nestableControls }: Props) => {
  const { showError } = useNotifications()

  return (
    <SearchBar
      name='badges'
      categories={searchBarCategories}
      nestableControls={nestableControls}
      onError={() => showError('Unable to fetch items.')}
    />
  )
}

export default JobListSearchBar

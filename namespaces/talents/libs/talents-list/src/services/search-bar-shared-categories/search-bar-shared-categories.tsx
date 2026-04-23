import React from 'react'
import {
  createInputCategory,
  createAutocompleteCategory
} from '@staff-portal/filters'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  getSearchBarLanguagesAutocomplete,
  LanguagesEdgeFragment
} from '@staff-portal/languages'
import {
  getIndustriesAutocomplete,
  IndustryEdgeFragment
} from '@staff-portal/facilities'

import { TalentNameEdgeFragment } from '../../containers/TalentListSearchBar/data/get-talents-by-name-search-bar-category-autocomplete/get-talents-by-name-search-bar-category-autocomplete.staff.gql.types'
import { getTalentsByNameAutocomplete } from '../../containers/TalentListSearchBar/data/get-talents-by-name-search-bar-category-autocomplete/get-talents-by-name-search-bar-category-autocomplete.staff.gql'

export const emailsSearchCategory = () =>
  createInputCategory({ name: 'emails' })

export const namesSearchCategory = () =>
  createAutocompleteCategory<string, TalentNameEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'names',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getTalentsByNameAutocomplete,
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

export const languagesSearchCategory = () =>
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
  })

export const industriesSearchCategory = () =>
  createAutocompleteCategory<string, IndustryEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'industries',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label ?? '',
    getKey: value => value,
    getOptions: getIndustriesAutocomplete,
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

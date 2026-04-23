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
  getSearchBarSkillNamesAutocomplete,
  SkillNameEdgeFragment
} from '../../data/get-skill-name-autocomplete'

export const searchBarCategories: SearchBarCategories = [
  createAutocompleteCategory<string, SkillNameEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'names',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getSearchBarSkillNamesAutocomplete,
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

export interface Props {
  nestableControls: ReactNode
}

const SkillNamesListSearchBar = ({ nestableControls }: Props) => {
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

export default SkillNamesListSearchBar

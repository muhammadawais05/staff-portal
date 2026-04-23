import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  createAutocompleteCategory,
  SearchBar,
  SearchBarCategories
} from '@staff-portal/filters'

import { getJobKeywordsAutocomplete } from './data/get-job-keywords-autocomplete/get-job-keywords-autocomplete.staff.gql'
import { JobKeywordEdgeFragment } from './data/get-job-keywords-autocomplete/get-job-keywords-autocomplete.staff.gql.types'

const searchBarCategories: SearchBarCategories = [
  createAutocompleteCategory<string, JobKeywordEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'keywords',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getJobKeywordsAutocomplete,
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

const JobStationSearchBar = ({ nestableControls }: Props) => {
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

export default JobStationSearchBar

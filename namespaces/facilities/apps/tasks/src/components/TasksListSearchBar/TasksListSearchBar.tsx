import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import {
  DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE,
  DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
} from '@staff-portal/config'
import {
  decodeEntityId,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  createAutocompleteCategory,
  createInputCategory,
  SearchBar,
  SearchBarCategories
} from '@staff-portal/filters'
import {
  getTaskTagsAutocomplete,
  TaskTagEdgeFragment
} from '@staff-portal/tasks'

import { getTaskKeywordsAutocomplete, getTaskNamesAutocomplete } from './data'
import { TaskNameEdgeFragment } from './data/get-task-names-autocomplete'
import { TaskKeywordEdgeFragment } from './data/get-task-keywords-autocomplete'

export const searchBarCategories: SearchBarCategories = [
  createAutocompleteCategory<string, TaskKeywordEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'keywords',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getTaskKeywordsAutocomplete,
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
  createAutocompleteCategory<string, TaskNameEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'names',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getTaskNamesAutocomplete,
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
  createAutocompleteCategory<string, TaskTagEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'tags',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    fromOption: ({ label }) => label || '',
    getKey: value => value,
    getOptions: getTaskTagsAutocomplete,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label, labelHighlight }) => (
      <AutocompleteHighlightOption
        label={label}
        labelHighlight={labelHighlight}
        titleCase
      />
    ),
    fromInputValue: value => value,
    getBadgeLabel: value => value
  }),
  createInputCategory({
    name: 'ids',
    label: 'IDs',
    getBadgeLabel: value => decodeEntityId(value).id,
    toQueryParam: value => decodeEntityId(value).id,
    fromQueryParam: value => encodeEntityId(value, 'Task'),
    fromInputValue: value => encodeEntityId(value, 'Task')
  })
]

export interface Props {
  nestableControls: ReactNode
}

const TasksListSearchBar = ({ nestableControls }: Props) => {
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

export default TasksListSearchBar

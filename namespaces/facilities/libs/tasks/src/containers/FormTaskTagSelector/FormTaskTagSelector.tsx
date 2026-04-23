import { Form, useField } from '@toptal/picasso-forms'
import { Props as FormTagSelectorProps } from '@toptal/picasso-forms/TagSelector/TagSelector'
import React, { useCallback } from 'react'
import { Item } from '@toptal/picasso/TagSelector'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { AutocompleteHighlightOption, useTagSelector } from '@staff-portal/ui'

import {
  useGetTaskTagsAutocomplete,
  TaskTagEdgeFragment
} from '../../data/get-task-tags-autocomplete'

type Props = Pick<FormTagSelectorProps, 'name' | 'label' | 'width'>

const getTagId = (tagEdge: Item) => (tagEdge as TaskTagEdgeFragment).key
const getTagName = (tagEdge: Item | null) =>
  (tagEdge as TaskTagEdgeFragment)?.node?.name ?? ''

const FormTaskTagSelector = (props: Props) => {
  const { data: taskTags, loading, getTaskTags } = useGetTaskTagsAutocomplete()

  const {
    input: { value: selectedTags }
  } = useField<TaskTagEdgeFragment[] | undefined>(props.name)

  const getTags = useCallback(
    (inputValue: string) =>
      getTaskTags(
        inputValue,
        selectedTags?.map(({ node }) => node?.id ?? '')
      ),
    [getTaskTags, selectedTags]
  )

  const tagSelectorProps = useTagSelector({
    options: taskTags,
    loading,
    getOptions: getTags
  })

  return (
    <Form.TagSelector
      {...props}
      {...tagSelectorProps}
      getDisplayValue={getTagName}
      getKey={getTagId}
      renderOption={item => {
        const { label, labelHighlight } = item as TaskTagEdgeFragment

        return (
          <AutocompleteHighlightOption
            label={label}
            labelHighlight={labelHighlight}
          />
        )
      }}
      noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
    />
  )
}

export default FormTaskTagSelector

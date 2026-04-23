import React from 'react'
import { TagSelector, TagSelectorProps } from '@toptal/picasso'
import { Item } from '@toptal/picasso/TagSelector'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'

import { diffTagLists } from '../../utils'

export interface Props extends Omit<TagSelectorProps, 'onSelect'> {
  onSelect: (value: Item) => void
  onDelete: (value: Item) => void
}

const TaskTagSelector = ({
  value: existingValues,
  getKey,
  onDelete,
  onSelect,
  ...rest
}: Props) => {
  const handleOnChange = (selectedValues: Item[]) => {
    const addedTag = diffTagLists(existingValues, selectedValues, getKey)

    if (addedTag) {
      return onSelect(addedTag)
    }

    const removedTag = diffTagLists(selectedValues, existingValues, getKey)

    if (removedTag) {
      return onDelete(removedTag)
    }
  }

  return (
    <TagSelector
      width='full'
      {...rest}
      onChange={handleOnChange}
      value={existingValues}
      getKey={getKey}
      noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
      renderLabel={({ displayValue, onDelete: handleDelete, disabled }) => (
        <TagSelector.Label
          disabled={disabled}
          onDelete={handleDelete}
          data-testid='tag-pill'
        >
          {displayValue}
        </TagSelector.Label>
      )}
    />
  )
}

export default TaskTagSelector

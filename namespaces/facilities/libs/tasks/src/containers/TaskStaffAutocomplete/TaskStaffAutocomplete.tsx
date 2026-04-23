import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOption
} from '@staff-portal/ui'

import {
  TaskStaffAutocompleteEdgeFragment,
  TaskStaffFragment
} from '../../data/task-staff-autocomplete-edge-fragment'
import { useGetTaskStaffAutocomplete } from '../../data/get-task-staff-autocomplete'

export interface Props
  extends Omit<
    AutocompleteProps,
    | 'loading'
    | 'value'
    | 'options'
    | 'getKey'
    | 'renderOption'
    | 'onFocus'
    | 'onChange'
    | 'onSelect'
    | 'children'
  > {
  initialDisplayValue?: string
  onSelect: (staffUser: TaskStaffFragment) => void
  onReset?: () => void
}

interface AutocompleteState {
  term: string
  display: string
}

const getKey = (item: TaskStaffAutocompleteEdgeFragment) => item.node?.id

const renderAssigneeOption = (item: Item) => {
  const { label, labelHighlight } = item as TaskStaffAutocompleteEdgeFragment

  return (
    <AutocompleteHighlightOption
      label={label}
      labelHighlight={labelHighlight}
    />
  )
}

const handleOnFocus = (event: ChangeEvent<{ select: () => void }>) =>
  event.target.select()

const TaskStaffAutocomplete = ({
  initialDisplayValue = '',
  onSelect,
  onReset,
  ...rest
}: Props) => {
  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState>(
    () => ({
      term: initialDisplayValue,
      display: initialDisplayValue
    })
  )

  const { getUsers, data: users, loading } = useGetTaskStaffAutocomplete()

  const [options, setOptions] = useState(users)

  useEffect(() => {
    setOptions(users)
  }, [users])

  const getUsersDebounced = useDebouncedCallback(
    (term: string) => getUsers({ term }),
    DEBOUNCE_LIMIT
  )

  const handleOnChange = (term: string, { isSelected }: ChangedOptions) => {
    // Change called when an item was selected
    if (isSelected) {
      return
    }

    // Reset/hide options while typing
    setOptions(null)

    // Change called when something is typed
    if (term.length) {
      setAutocompleteState(state => ({ ...state, term }))
      getUsersDebounced(term)

      return
    }

    // Changed called when reset button is clicked
    // `term` is an empty string
    setAutocompleteState({ term, display: term })
    onReset?.()
  }

  const handleOnSelect = (selectedStaffUser: Item) => {
    const { node, label } =
      selectedStaffUser as TaskStaffAutocompleteEdgeFragment

    setAutocompleteState({
      term: label as string,
      display: label as string
    })

    if (node) {
      onSelect(node)
    }
  }

  const handleBlur = () =>
    setAutocompleteState(state => ({
      ...state,
      term: state.display
    }))

  return (
    <Autocomplete<TaskStaffAutocompleteEdgeFragment>
      {...rest}
      loading={loading}
      value={autocompleteState.term}
      options={options}
      getKey={getKey}
      renderOption={renderAssigneeOption}
      onFocus={handleOnFocus}
      onBlur={handleBlur}
      onChange={handleOnChange}
      onSelect={handleOnSelect}
      noOptionsText='No results'
    />
  )
}

export default TaskStaffAutocomplete

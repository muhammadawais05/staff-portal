import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOptionWithPhoto
} from '@staff-portal/ui'
import React, { useState, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'

import {
  useGetUserFieldAutocomplete,
  UserFieldAutocompleteEdgeFragment
} from './data'

export interface UserFieldAutocompleteProps
  extends Omit<
    AutocompleteProps,
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
  onSelect: (user: { id: string }) => void
  onReset?: () => void
}

const getKey = (item: UserFieldAutocompleteEdgeFragment) => item.node?.id

const renderOption = ({
  label,
  labelHighlight,
  photo,
  nodeTypes
}: UserFieldAutocompleteEdgeFragment) => {
  return (
    <AutocompleteHighlightOptionWithPhoto
      label={label}
      labelHighlight={labelHighlight}
      nodeTypes={nodeTypes}
      photo={photo?.thumb}
    />
  )
}

const UserFieldAutocomplete = ({
  initialDisplayValue,
  onSelect,
  disabled,
  ...inputProps
}: UserFieldAutocompleteProps) => {
  const [term, setTerm] = useState<string>(initialDisplayValue ?? '')
  const input = useRef<HTMLInputElement>(null)

  // Focus on initial render
  useEffect(() => {
    input.current?.focus()
    input.current?.setSelectionRange(0, -1)
  }, [input])

  const { getUsers, loading, data } = useGetUserFieldAutocomplete()

  const fetchUsersDebounced = useDebouncedCallback(getUsers, DEBOUNCE_LIMIT)

  const handleOnChange = (newValue: string) => {
    setTerm(newValue)
    fetchUsersDebounced({ term: newValue })
  }

  const handleOnSelect = (item: UserFieldAutocompleteEdgeFragment) => {
    const { label, node } = item

    setTerm(label as string)

    if (node) {
      onSelect({ id: node.id })
    }
  }

  return (
    <Autocomplete<UserFieldAutocompleteEdgeFragment>
      {...inputProps}
      ref={input}
      width='full'
      testIds={{
        input: 'users-autocomplete'
      }}
      enableAutofill
      loading={loading}
      options={data}
      disabled={disabled}
      getKey={getKey}
      renderOption={renderOption}
      onSelect={handleOnSelect}
      onChange={handleOnChange}
      value={term}
    />
  )
}

export default UserFieldAutocomplete

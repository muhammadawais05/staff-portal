import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOptionWithPhoto
} from '@staff-portal/ui'
import { ChangedOptions } from '@toptal/picasso/Autocomplete'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'

import { ClientAutocompleteEdgeFragment } from '../../data/client-autocomplete-edge-fragment'
import { useGetClientAutocomplete } from '../../data/get-client-autocomplete'

export interface CompanyAutocompleteProps
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
  onSelect: (
    staffUser: { id: string; companyLegacyId: number },
    label?: string | null
  ) => void
  onReset?: () => void
  onChange?: () => void
}

interface AutocompleteState {
  term: string
  display: string
}

const getKey = (item: ClientAutocompleteEdgeFragment) => item.node?.id

const renderAssigneeOption = ({
  label,
  labelHighlight,
  photo,
  nodeTypes
}: ClientAutocompleteEdgeFragment) => {
  return (
    <AutocompleteHighlightOptionWithPhoto
      label={label}
      labelHighlight={labelHighlight}
      nodeTypes={nodeTypes}
      photo={photo?.thumb}
    />
  )
}

const handleOnFocus = (event: ChangeEvent<{ select: () => void }>) =>
  event.target.select()

const CompanyAutocomplete = ({
  initialDisplayValue = '',
  onSelect,
  onReset,
  placeholder,
  onChange,
  ...rest
}: CompanyAutocompleteProps) => {
  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState>(
    {
      term: initialDisplayValue,
      display: initialDisplayValue
    }
  )

  const { getClients, data: users, loading } = useGetClientAutocomplete()

  const [options, setOptions] = useState(users)

  useEffect(() => {
    setOptions(users)
  }, [users])

  const getUsersDebounced = useDebouncedCallback(
    (term: string) => getClients({ term }),
    DEBOUNCE_LIMIT
  )

  const handleOnChange = (term: string, { isSelected }: ChangedOptions) => {
    onChange?.()

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

  const handleOnSelect = ({ node, label }: ClientAutocompleteEdgeFragment) => {
    setAutocompleteState({
      term: label as string,
      display: label as string
    })

    if (node) {
      onSelect(node, label)
    }
  }

  const handleBlur = () =>
    setAutocompleteState(state => ({
      ...state,
      term: state.display
    }))

  return (
    <Autocomplete<ClientAutocompleteEdgeFragment>
      {...rest}
      loading={loading || rest.loading}
      value={autocompleteState.term}
      options={options}
      getKey={getKey}
      renderOption={renderAssigneeOption}
      onFocus={handleOnFocus}
      onBlur={handleBlur}
      onChange={handleOnChange}
      onSelect={handleOnSelect}
      placeholder={
        // we have to compare with `undefined` so that empty '' placeholder can be used
        placeholder === undefined ? 'Add the company name' : placeholder
      }
    />
  )
}

export default CompanyAutocomplete

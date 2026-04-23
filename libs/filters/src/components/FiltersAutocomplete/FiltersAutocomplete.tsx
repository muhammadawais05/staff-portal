import React, { ChangeEvent, useState } from 'react'
import { Autocomplete, AutocompleteHighlightOption } from '@staff-portal/ui'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'
import { useDebouncedCallback } from 'use-debounce'
import { DEBOUNCE_LIMIT, NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import FiltersField from '../Filters/FiltersField'
import {
  AutocompleteFilterConfig,
  CommonFilterConfig,
  useFiltersContext
} from '../Filters'

interface AutocompleteState {
  term: string
  display: string
}

export type Props = Omit<CommonFilterConfig & AutocompleteFilterConfig, 'type'>

const renderOptionDefault = (item: Item) => {
  const { label, labelHighlight } = item

  return (
    <AutocompleteHighlightOption
      label={label as string}
      labelHighlight={labelHighlight as string}
      titleCase
    />
  )
}

const handleOnFocus = (event: ChangeEvent<{ select: () => void }>) =>
  event.target.select()

const identity = (item: unknown) => item as string

const FiltersAutocomplete = ({
  name,
  label,
  labelWidth,
  useGetOptions,
  useGetFilterLabel,
  placeholder = NOT_SELECTED_PLACEHOLDER,
  noOptionsText = 'No results',
  getKey = identity,
  getId = identity,
  getLabel = identity,
  renderOption = renderOptionDefault
}: Props) => {
  const { getFilterValue, setFilterValue, clearFilterValue } =
    useFiltersContext()
  const filterValue = getFilterValue<string | undefined>(name)

  const { label: initialDisplayValue = '' } = useGetFilterLabel(filterValue)
  const { getOptions, options: optionsData, loading } = useGetOptions()

  const [isTyping, setIsTyping] = useState(false)

  const options = isTyping || loading ? null : optionsData

  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState>(
    { term: initialDisplayValue, display: initialDisplayValue }
  )

  const getDataDebounced = useDebouncedCallback((term: string) => {
    getOptions({ term })
    setIsTyping(false)
  }, DEBOUNCE_LIMIT)

  const handleChange = (term: string, { isSelected }: ChangedOptions) => {
    if (isSelected) {
      return
    }

    if (!term.length) {
      clearFilterValue(name)
    }

    setIsTyping(true)

    getDataDebounced(term)

    setAutocompleteState(state => ({ ...state, term }))
  }

  const handleBlur = () =>
    setAutocompleteState(state => ({ ...state, term: state.display }))

  const handleOnSelect = (item: Item) => {
    const value = getId(item)

    if (!value) {
      return
    }

    const term = getLabel(item)

    setAutocompleteState({ term, display: term })
    setFilterValue(name, value)
  }

  return (
    <FiltersField
      key={name}
      label={label}
      labelWidth={labelWidth}
      htmlFor={name}
    >
      <Autocomplete
        width='full'
        id={name}
        placeholder={placeholder}
        loading={loading}
        value={autocompleteState.term}
        options={options}
        getKey={getKey}
        renderOption={renderOption}
        onFocus={handleOnFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onSelect={handleOnSelect}
        noOptionsText={noOptionsText}
      />
    </FiltersField>
  )
}

export default FiltersAutocomplete

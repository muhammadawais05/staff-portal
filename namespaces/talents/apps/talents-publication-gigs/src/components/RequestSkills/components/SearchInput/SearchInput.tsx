import React, { ReactNode, useState, useMemo } from 'react'
import { Search16 } from '@toptal/picasso/Icon'
import { Autocomplete } from '@staff-portal/ui'

import crossSearchOption from './crossSearchOption'
import { SEARCH_TYPES, SkillsAutoSuggestOption } from '../../types'

interface SearchInputProps {
  searchType: SEARCH_TYPES
  initialValue: string
  placeholder: string
  onBlur?: () => void
  onChange?: (name: string) => void
  onSelect: (type: SEARCH_TYPES, name: string) => void
  endAdornment?: ReactNode
  crossSearchTypes?: { name: string; type: SEARCH_TYPES }[]
  options: SkillsAutoSuggestOption[]
  onReset: () => void
  loadSuggestions: (skillName: string) => void
  loading: boolean
  searchTypeDropdownOpen: boolean
  icon?: ReactNode
  'data-testid'?: string
}

const DefaultIcon = <Search16 />

const SearchInput = ({
  searchType,
  initialValue,
  placeholder,
  onBlur,
  onChange,
  onSelect,
  onReset,
  endAdornment,
  crossSearchTypes = [],
  loadSuggestions,
  options,
  loading,
  searchTypeDropdownOpen,
  icon = DefaultIcon,
  'data-testid': dataTestId,
  ...rest
}: SearchInputProps) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (
    newValue: string,
    { isSelected }: { isSelected: boolean }
  ) => {
    if (onChange) {
      onChange(newValue)
    }
    setValue(newValue)

    // If empty or selected from the options, there's no need to fetch for options with this value
    if (!newValue || isSelected) {
      onReset()

      return
    }

    loadSuggestions(newValue)
  }

  const addAndReset = (input: string, type?: SEARCH_TYPES) => {
    const option = options.find(option => option.text === input)

    if (!option) {
      return
    }
    onSelect(type ?? searchType, input)
    setValue('')
    onReset()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (value && e.key === 'Enter') {
      addAndReset(value)
    }
  }

  const crossSearchOptions = useMemo(
    () =>
      crossSearchTypes.map(({ name, type }) => crossSearchOption(name, type)),
    [crossSearchTypes]
  )

  const allOptions = useMemo(
    () =>
      !value || (loading && options.length === 0)
        ? null
        : options.concat(crossSearchOptions),
    [value, loading, options, crossSearchOptions]
  )

  return (
    <Autocomplete<SkillsAutoSuggestOption>
      icon={icon}
      autoComplete='none'
      getKey={item => `${item.key}-${item.text}`}
      placeholder={placeholder}
      width='full'
      value={value}
      options={searchTypeDropdownOpen ? null : allOptions}
      renderOption={({
        text,
        render
      }: {
        text?: string
        render?: (value: string) => ReactNode
      }) => (render ? render(value) : text)}
      onBlur={onBlur}
      onChange={handleChange}
      onSelect={(
        item: SkillsAutoSuggestOption & { crossSearchType?: SEARCH_TYPES }
      ) =>
        item.crossSearchType
          ? addAndReset(value, item.crossSearchType)
          : addAndReset(item.text as string)
      }
      noOptionsText={searchTypeDropdownOpen ? undefined : 'No options'}
      showOtherOption={!searchTypeDropdownOpen && !options}
      onOtherOptionSelect={val => addAndReset(val)}
      onKeyDown={onKeyDown}
      endAdornment={endAdornment}
      testIds={{
        input: dataTestId || 'searchInput'
      }}
      {...rest}
    />
  )
}

export default SearchInput

import React, { useState, useCallback, useEffect } from 'react'
import { Typography, InputAdornment } from '@toptal/picasso'
import { Search16 } from '@toptal/picasso/Icon'
import { Item } from '@toptal/picasso/Autocomplete'
import { useDebounce } from 'use-debounce'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { useApolloClient } from '@staff-portal/data-layer-service'
import { Autocomplete } from '@staff-portal/ui'

import {
  SearchBarCategory,
  AutocompleteSearchBarCategory,
  MultiAutocompleteSearchBarCategory,
  SearchBarOption
} from '../SearchBar/types'
import SearchBarCategorySelector from '../SearchBarCategorySelector'
import {
  filterOptions,
  takeNOptions
} from '../../utils/search-bar-autocomplete'
import * as S from './styles'

const DEBOUNCE_LIMIT = 300

export interface Props {
  value: string
  activeCategory:
    | AutocompleteSearchBarCategory
    | MultiAutocompleteSearchBarCategory
  categories: SearchBarCategory[]
  onChange: (newInputValue: string) => void
  onSelect: (newOption: Item) => void
  onOtherOption: (newValue: string) => void
  onCategoryChange: (category: SearchBarCategory) => void
  onError?: (errors: readonly Error[]) => void
  selectedFilters: SearchBarOption[]
}

const renderOtherOption = (value: string) => (
  <Typography size='xsmall' color='dark-grey'>
    Search for: {value}
  </Typography>
)

const SearchBarAutocomplete = ({
  value = '',
  activeCategory,
  categories,
  onChange,
  onSelect,
  onOtherOption,
  onCategoryChange,
  onError = () => {},
  selectedFilters
}: Props) => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<Item[] | null>(null)

  const resetOptions = () => {
    setOptions(null)
  }

  const { getOptionKey, renderOption, fromInputValue } = activeCategory

  const [debouncedValue] = useDebounce(value, DEBOUNCE_LIMIT)

  const fetchOptions = useCallback(async () => {
    if (!debouncedValue) {
      setLoading(false)
      resetOptions()

      return
    }

    try {
      setLoading(true)

      const resultsLimit =
        activeCategory.numberOfAutocompleteResults ??
        DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
      const limit = resultsLimit + selectedFilters.length

      const { data, errors } = await activeCategory.getOptions(
        debouncedValue,
        limit,
        client
      )

      if (errors) {
        onError(errors)
      }

      const filteredOptions = filterOptions({
        data,
        excludeFilters: selectedFilters,
        activeCategory
      })
      const resultOptions = takeNOptions(filteredOptions, resultsLimit)

      setOptions(resultOptions)
    } catch (error) {
      if (error instanceof Error) {
        onError([error])
      }
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, debouncedValue])

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions])

  const handleSelect = (item: Item) => {
    onSelect(item)
    onChange('')
  }

  const handleOtherOptionSelect = (newValue: string) => {
    onOtherOption(newValue)
    onChange('')
  }

  const handleActiveCategoryChange = (newActiveCategory: SearchBarCategory) => {
    resetOptions()
    onCategoryChange(newActiveCategory)
  }

  return (
    <Autocomplete
      placeholder={`Filter by ${activeCategory.label || activeCategory.name}`}
      startAdornment={<Search16 css={S.searchIcon} />}
      width='full'
      value={value}
      getKey={getOptionKey}
      options={value ? options : null}
      onSelect={handleSelect}
      showOtherOption={Boolean(fromInputValue)}
      renderOtherOption={renderOtherOption}
      onOtherOptionSelect={fromInputValue ? handleOtherOptionSelect : undefined}
      onChange={(newValue: string) => {
        resetOptions()
        onChange(newValue)
      }}
      loading={loading}
      endAdornment={
        <InputAdornment
          stopPropagation
          position='end'
          data-testid='search-categories'
        >
          <SearchBarCategorySelector
            activeCategory={activeCategory}
            categories={categories}
            onCategoryChange={handleActiveCategoryChange}
          />
        </InputAdornment>
      }
      renderOption={renderOption}
      testIds={{
        input: 'search-input'
      }}
    />
  )
}

export default SearchBarAutocomplete

import { Item } from '@toptal/picasso/Autocomplete'
import { useEffect, useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const DEBOUNCE_LIMIT = 500
const MIN_LENGTH = 1

interface AutocompleteState {
  term: string
  display: string
}

interface OtherProps {
  [key: string]: unknown
}

const useDebouncedAutocomplete = <TSearchOption extends Item>({
  onSearch,
  searchOptions = null,
  loadingOptions,
  initialSearchTerm = ''
}: {
  onSearch: (term: string, otherProps?: OtherProps) => void
  searchOptions: TSearchOption[] | null
  loadingOptions: boolean
  initialSearchTerm?: string
}) => {
  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState>(
    () => ({
      term: initialSearchTerm,
      display: initialSearchTerm
    })
  )

  const [previousTerm, setPreviousTerm] = useState(initialSearchTerm)
  const [initialOptions, setInitialOptions] = useState<TSearchOption[] | null>(
    null
  )
  const [options, setOptions] = useState<TSearchOption[] | null>(null)

  useEffect(() => {
    setInitialOptions(searchOptions)
    setOptions(searchOptions)
  }, [searchOptions])

  const resetSearchOptions = useCallback(() => {
    setOptions(null)
  }, [])

  const handleSearch = useCallback(
    (searchTerm: string, otherProps?: OtherProps) => {
      if (searchTerm.length >= MIN_LENGTH) {
        if (previousTerm === searchTerm) {
          setOptions(initialOptions)
        }

        setPreviousTerm(searchTerm)
        onSearch(searchTerm, otherProps)
      } else {
        resetSearchOptions()
      }
    },
    [initialOptions, onSearch, previousTerm, resetSearchOptions]
  )

  const searchDebounced = useDebouncedCallback(handleSearch, DEBOUNCE_LIMIT)

  const setSearchTerm = useCallback(
    (searchTerm: string) => {
      setAutocompleteState(state => ({ ...state, term: searchTerm }))
      resetSearchOptions()
    },
    [resetSearchOptions]
  )

  const setToLastValidTerm = () => {
    setAutocompleteState(state => ({ ...state, term: state.display }))
  }

  const selectItem = (display: string) => {
    setAutocompleteState({
      display,
      term: display
    })
  }

  return {
    search: searchDebounced,
    searching: loadingOptions,
    searchTerm: autocompleteState.term,
    setSearchTerm,
    searchOptions: options,
    setToLastValidTerm,
    selectItem
  }
}

export default useDebouncedAutocomplete

import React, { useCallback, ComponentProps, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMessages } from '@staff-portal/data-layer-service'
import {
  SearchBarSkillAutocompleteEdgeFragment,
  useGetSearchBarSkillsAutocomplete
} from '@staff-portal/skills'

import SearchInput from '../SearchInput'
import { SkillsAutoSuggestOption } from '../../types'

type SkillsAutoSuggestProps = Omit<
  ComponentProps<typeof SearchInput>,
  keyof ReturnType<typeof useGetAutoSugestions>
> & {
  searchTypeDropdownOpen: boolean
}

const DEBOUNCE_LIMIT = 300
const ERROR_MESSAGE = 'Error while fetching for skill suggestions.'

const dataFormatter = (
  data: SearchBarSkillAutocompleteEdgeFragment[] | undefined
): SkillsAutoSuggestOption[] =>
  data?.map(item => ({
    text: item.label ?? '',
    value: item.labelHighlight ?? item.label ?? '',
    key: item.key
  })) ?? []

const useGetAutoSugestions = () => {
  const { showError } = useNotifications()
  const { fetchData, data, loading } = useGetSearchBarSkillsAutocomplete({
    onError: error => showError(concatMessages([ERROR_MESSAGE, error.message]))
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedValue] = useDebounce(searchTerm, DEBOUNCE_LIMIT)
  const options = searchTerm ? dataFormatter(data) : []

  const onReset = () => {
    setSearchTerm('')
  }

  useEffect(() => {
    if (debouncedValue) {
      fetchData(debouncedValue, [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const loadSuggestions = useCallback(
    (term: string) => (term ? setSearchTerm(term) : onReset()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedValue]
  )

  return {
    loadSuggestions,
    loading,
    options,
    onReset
  }
}

const SkillsAutoSuggest = (props: SkillsAutoSuggestProps) => {
  const { loading, loadSuggestions, options, onReset } = useGetAutoSugestions()

  return (
    <SearchInput
      {...props}
      options={options}
      onReset={onReset}
      loadSuggestions={loadSuggestions}
      data-testid='skillsAutoSuggest'
      loading={loading}
    />
  )
}

export default SkillsAutoSuggest

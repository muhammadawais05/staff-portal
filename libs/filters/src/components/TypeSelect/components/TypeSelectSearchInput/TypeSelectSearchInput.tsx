import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { Search16, CloseMinor16 } from '@toptal/picasso/Icon'
import { useDebouncedCallback } from 'use-debounce'

import * as S from './styles'

const DEBOUNCE_DELAY = 300

export interface Props {
  placeholder?: string
  onChange: (searchTerm: string) => void
  loading?: boolean
}

const TypeSelectSearchInput = ({ placeholder, onChange, loading }: Props) => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleNewSearchTerm = () => {
    const searchValue = searchInputValue.trim()

    onChange(searchValue)
  }

  const debouncedNewSearchTermHandler = useDebouncedCallback(
    handleNewSearchTerm,
    DEBOUNCE_DELAY
  )

  const handleSearchInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setSearchInputValue(event.target.value)
    debouncedNewSearchTermHandler()
  }

  const handleClearSearch = () => {
    setSearchInputValue('')
    debouncedNewSearchTermHandler()
  }

  return (
    <Input
      data-testid='type-select-search-input'
      autoFocus
      width='full'
      placeholder={placeholder}
      icon={<Search16 />}
      iconPosition='start'
      value={searchInputValue}
      onChange={handleSearchInputChange}
      disabled={loading}
      endAdornment={
        searchInputValue && (
          <Container inline css={S.closeButton} onClick={handleClearSearch}>
            <CloseMinor16 />
          </Container>
        )
      }
    />
  )
}

export default TypeSelectSearchInput

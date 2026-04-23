import React from 'react'
import { Input } from '@toptal/picasso'
import { Search16 } from '@toptal/picasso/Icon'

import { SearchBarCategory } from '../SearchBar/types'
import SearchBarCategorySelector from '../SearchBarCategorySelector'
import * as S from './styles'

export interface Props {
  value: string
  activeCategory: SearchBarCategory<string>
  categories: SearchBarCategory<string>[]
  onChange: (newInputValue: string) => void
  onSelect: (newOption: string) => void
  onCategoryChange: (category: SearchBarCategory<string>) => void
}

const SearchBarInput = ({
  value = '',
  categories,
  activeCategory,
  onChange,
  onSelect,
  onCategoryChange
}: Props) => {
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    onChange(event.target.value)
  }

  const handleInputReset = () => {
    onChange('')
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        onChange('')
        break
      case 'Enter':
        onChange('')

        onSelect(value)
        break
    }
  }

  return (
    <Input
      startAdornment={<Search16 css={S.searchIcon} />}
      width='full'
      placeholder={`Filter by ${activeCategory.label || activeCategory.name}`}
      data-testid='search-input'
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      enableReset
      onResetClick={handleInputReset}
      endAdornment={
        <SearchBarCategorySelector
          activeCategory={activeCategory}
          categories={categories}
          onCategoryChange={onCategoryChange}
        />
      }
    />
  )
}

export default SearchBarInput

import React, { useState, memo, ReactNode } from 'react'
import { Container } from '@toptal/picasso'
import { Item as AutocompleteOption } from '@toptal/picasso/Autocomplete'

import SearchBarBadges, {
  LOGIC_OPERATOR_FILTER_NAME
} from '../SearchBarBadges/SearchBarBadges'
import SearchBarAutocomplete from '../SearchBarAutocomplete'
import SearchBarInput from '../SearchBarInput'
import { SearchBarCategory, SearchBarOption, FilterObject } from './types'
import {
  isAutocompleteSearchBarCategory,
  isMultiAutocompleteSearchBarCategory
} from '../../utils/search-bar-category'
import { getBadgesWithCategories } from '../../utils/search-bar-badges'
import * as S from './styles'
import { useFiltersContext } from '../Filters'
import { LogicOperator } from '../../types'

export interface Props {
  name: string
  categories: SearchBarCategory[]
  nestableControls: ReactNode
  onError?: (errors: readonly Error[]) => void
  shouldRenderLogicOperatorControls?: boolean
}

const SearchBar = ({
  name,
  categories,
  nestableControls,
  onError,
  shouldRenderLogicOperatorControls
}: Props) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (newInputValue: string) => {
    setInputValue(newInputValue)
  }

  const [activeCategory, setActiveCategory] = useState<SearchBarCategory>(
    categories[0]
  )
  const handleActiveCategoryChange = (newActiveCategory: SearchBarCategory) => {
    setActiveCategory(newActiveCategory)
  }

  const { getFilterValue, setFilterValue } = useFiltersContext()

  const badges = (getFilterValue(name) || {}) as Record<string, FilterObject[]>

  const logicValue = getFilterValue(LOGIC_OPERATOR_FILTER_NAME) as LogicOperator

  const handleLogicChange = (newLogicValue: LogicOperator) => {
    setFilterValue(LOGIC_OPERATOR_FILTER_NAME, newLogicValue)
  }

  const handleAutocompleteSelect = (newOption: AutocompleteOption) => {
    if (
      !isAutocompleteSearchBarCategory(activeCategory) &&
      !isMultiAutocompleteSearchBarCategory(activeCategory)
    ) {
      return
    }

    const { category: targetCategory, value: newFilterValue } =
      isMultiAutocompleteSearchBarCategory(activeCategory)
        ? activeCategory.fromOption(newOption as AutocompleteOption)
        : {
            category: activeCategory,
            value: activeCategory.fromOption(newOption as AutocompleteOption)
          }

    if (!targetCategory) {
      return
    }

    const filterValues = badges[targetCategory.name] || []

    const optionExists = filterValues.find(filterValue => {
      const filterKey = activeCategory.getKey(filterValue)
      const newFilterKey = activeCategory.getKey(newFilterValue)

      return filterKey === newFilterKey
    })

    if (optionExists) {
      return
    }

    setFilterValue(name, {
      ...badges,
      [targetCategory.name]: [...filterValues, newFilterValue]
    })
  }

  const handleOtherOption = (newValue: string) => {
    if (
      !isAutocompleteSearchBarCategory(activeCategory) &&
      !isMultiAutocompleteSearchBarCategory(activeCategory)
    ) {
      return
    }

    if (!activeCategory.fromInputValue) {
      return
    }

    const filterValues = badges[activeCategory.name] || []
    const newFilterValue = activeCategory.fromInputValue(newValue)

    const optionExists = filterValues.find(filterValue => {
      const filterKey = activeCategory.getKey(filterValue)
      const newFilterKey = activeCategory.getKey(newFilterValue)

      return filterKey === newFilterKey
    })

    if (optionExists) {
      return
    }

    setFilterValue(name, {
      ...badges,
      [activeCategory.name]: [...filterValues, newFilterValue]
    })
  }

  const handleInputSelect = (newValue: string) => {
    const filterValues = badges[activeCategory.name] || []

    const optionExists = filterValues.find(filterValue => {
      const filterKey = activeCategory.getKey(filterValue)

      return filterKey === newValue
    })

    if (optionExists) {
      return
    }

    if (!activeCategory.fromInputValue) {
      return
    }

    setFilterValue(name, {
      ...badges,
      [activeCategory.name]: [
        ...filterValues,
        activeCategory.fromInputValue(newValue)
      ]
    })
  }

  const handleDelete = ({ value, category }: SearchBarOption) => {
    const removingValueKey = category.getKey(value)

    const categoryValue = badges[category.name].filter(selectedValue => {
      const selectedKey = category.getKey(selectedValue)

      return selectedKey !== removingValueKey
    })

    setFilterValue(name, {
      ...badges,
      [category.name]: categoryValue
    })
  }

  const handleBadgeChange = (
    category: SearchBarCategory<FilterObject>,
    badge: FilterObject
  ) => {
    const categoryBadges = badges[category.name]

    const badgeIndex = categoryBadges.findIndex(
      categoryBadge => category.getKey(categoryBadge) === category.getKey(badge)
    )

    if (badgeIndex < 0) {
      return
    }

    const newCategoryBadges = [
      ...categoryBadges.slice(0, badgeIndex),
      badge,
      ...categoryBadges.slice(badgeIndex + 1, categoryBadges.length)
    ]

    setFilterValue(name, {
      ...badges,
      [category.name]: newCategoryBadges
    })
  }

  const selectedFilters = getBadgesWithCategories(badges, categories)

  return (
    <Container
      flex
      direction='column'
      css={S.root}
      data-testid='filters-search-bar'
    >
      <Container flex justifyContent='flex-end'>
        <Container flex css={S.inputWrapper}>
          {isAutocompleteSearchBarCategory(activeCategory) ||
          isMultiAutocompleteSearchBarCategory(activeCategory) ? (
            <SearchBarAutocomplete
              key={selectedFilters.length}
              value={inputValue}
              activeCategory={activeCategory}
              categories={categories}
              onChange={handleChange}
              onSelect={handleAutocompleteSelect}
              onOtherOption={handleOtherOption}
              onCategoryChange={handleActiveCategoryChange}
              onError={onError}
              selectedFilters={selectedFilters}
            />
          ) : (
            <SearchBarInput
              value={inputValue}
              activeCategory={activeCategory}
              categories={categories}
              onCategoryChange={handleActiveCategoryChange}
              onChange={handleChange}
              onSelect={handleInputSelect}
            />
          )}
        </Container>
        {nestableControls}
      </Container>
      <SearchBarBadges
        logicValue={logicValue}
        selectedFilters={selectedFilters}
        categories={categories}
        onBadgeDelete={handleDelete}
        onBadgeChange={handleBadgeChange}
        onLogicChange={handleLogicChange}
        shouldRenderLogicOperatorControls={shouldRenderLogicOperatorControls}
      />
    </Container>
  )
}

export default memo(SearchBar)

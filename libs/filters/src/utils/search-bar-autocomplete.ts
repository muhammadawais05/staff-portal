import { Item } from '@toptal/picasso/Autocomplete'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'

import {
  SearchBarOption,
  AutocompleteSearchBarCategory,
  MultiAutocompleteSearchBarCategory
} from '../components/SearchBar/types'
import { isMultiAutocompleteSearchBarCategory } from '../utils/search-bar-category'

export const filterOptions = ({
  data,
  excludeFilters,
  activeCategory
}: {
  data: Item[]
  excludeFilters: SearchBarOption[]
  activeCategory:
    | AutocompleteSearchBarCategory
    | MultiAutocompleteSearchBarCategory
}) => {
  return data.filter(item => {
    let itemKey: string

    if (isMultiAutocompleteSearchBarCategory(activeCategory)) {
      const { category: itemCategory, value: itemFilterValue } =
        activeCategory.fromOption(item)

      itemKey = itemCategory.getKey(itemFilterValue)
    } else {
      itemKey = activeCategory.getKey(activeCategory.fromOption(item))
    }

    return !excludeFilters.find(
      ({ category, value }) => category.getKey(value) === itemKey
    )
  })
}

export const takeNOptions = (
  items: Item[],
  count: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
) => items.slice(0, count)

export const sortOptions = <T extends object>(
  items: T[],
  query: string,
  sortBy: keyof T
) => {
  const beginsWithItems = []
  const caseSensitiveItems = []
  const restItems = []

  for (const item of items) {
    const itemValue = item[sortBy] as unknown as string

    const lowerCaseItemValue = itemValue.toLowerCase()
    const lowerCaseQuery = query.toLowerCase()

    if (lowerCaseItemValue.startsWith(lowerCaseQuery)) {
      beginsWithItems.push(item)
    } else if (itemValue.includes(query)) {
      caseSensitiveItems.push(item)
    } else {
      restItems.push(item)
    }
  }

  return [...beginsWithItems, ...caseSensitiveItems, ...restItems]
}

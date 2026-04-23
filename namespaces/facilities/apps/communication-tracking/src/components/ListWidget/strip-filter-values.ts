import { Item } from '@toptal/picasso/Autocomplete'
import {
  SearchBarCategory,
  SearchBarCategories,
  SearchBarCategoryQueryParams
} from '@staff-portal/filters'

import { SEARCH_BAR_URL_PARAM_NAME } from './config'

const getCategory = <T extends SearchBarCategory>(
  categories: T[],
  categoryName: string
) => {
  const category = categories.find(({ name }) => name === categoryName)

  return category as T
}

export const stripFilterValues = (
  newFilterValues: Record<string, unknown>,
  categories: SearchBarCategories
) => {
  const newSearchBarItems = newFilterValues[SEARCH_BAR_URL_PARAM_NAME] as
    | Record<string, Item[]>
    | undefined

  if (!newSearchBarItems) {
    return newFilterValues
  }

  const newSearchBarValues: Record<string, SearchBarCategoryQueryParams> = {}

  Object.entries(newSearchBarItems).forEach(([categoryName, items]) => {
    const category = getCategory(categories, categoryName) as SearchBarCategory

    const { toQueryParam, toQueryParams } = category

    if (toQueryParam) {
      newSearchBarValues[categoryName] = items.map(toQueryParam)
    } else if (toQueryParams) {
      newSearchBarValues[categoryName] = toQueryParams(items)
    } else {
      throw new Error(
        `Please specify "toQueryParam" or "toQueryParams" setting for "${category.name}" search category`
      )
    }
  })

  return {
    ...newFilterValues,
    [SEARCH_BAR_URL_PARAM_NAME]: newSearchBarValues
  }
}

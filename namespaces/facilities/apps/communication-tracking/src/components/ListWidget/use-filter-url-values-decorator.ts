import { useState, useMemo, useEffect, useCallback } from 'react'
import { Item } from '@toptal/picasso/Autocomplete'
import {
  SearchBarCategory,
  SearchBarCategories,
  SearchBarOptionType
} from '@staff-portal/filters'

import { SEARCH_BAR_URL_PARAM_NAME } from './config'

const getCategory = (
  categoriesMap: Record<string, SearchBarCategory> | undefined,
  categoryName: string
) => {
  const category = categoriesMap?.[categoryName]

  if (!category) {
    throw new Error(`Unable to find category with name "${categoryName}"`)
  }

  return category
}

// Logic here is highly complex. We did our best to clarify what is going on!
export const useFilterUrlValuesDecorator = (
  filterUrlValues: Record<string, unknown>,
  categories: SearchBarCategories
) => {
  // An in-memory buffer of searchbar options => no extra info needed
  // Might not match the currently selected options
  const [bufferedSearchBarOptions, setBufferedSearchBarOptions] = useState<
    SearchBarOptionType[]
  >([])

  const categoriesMap = useMemo(
    () =>
      categories &&
      Object.fromEntries(categories.map(category => [category.name, category])),
    // We need to ignore the dynamic part of categories, since it blows the
    // effect used to fetch items in `ListWidget`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const searchBarValuesMap = filterUrlValues[SEARCH_BAR_URL_PARAM_NAME] as
    | Record<string, string[]>
    | undefined

  const [searchBarItemsMapMemoized, incompleteSearchBarItemsValuesMapMemoized] =
    useMemo(() => {
      if (!searchBarValuesMap) {
        return []
      }

      const searchBarItemsMap: Record<string, Item[]> = {}
      const incompleteSearchBarItemsValuesMap: Record<string, string[]> = {}

      const findBufferedItem = (itemValue: string, categoryName: string) => {
        const bufferedSearchBarOption = bufferedSearchBarOptions.find(
          ({ value, category }: SearchBarOptionType) =>
            category.name === categoryName &&
            category.toQueryParam?.(value as Item) === itemValue
        )

        return bufferedSearchBarOption?.value
      }

      const classifySearchBarValue = (
        value: string,
        category: SearchBarCategory
      ) => {
        const { name, getItemsByIdResult } = category
        const searchBarItemsGroup = searchBarItemsMap[name] || []
        const incompleteSearchBarItemsValuesGroup =
          incompleteSearchBarItemsValuesMap[name] || []

        const needsMoreInfo = Boolean(getItemsByIdResult)

        if (needsMoreInfo) {
          const bufferedItem = findBufferedItem(value, name)

          if (bufferedItem) {
            searchBarItemsMap[name] = [
              ...searchBarItemsGroup,
              bufferedItem as Item
            ]
          } else {
            incompleteSearchBarItemsValuesMap[name] = [
              ...incompleteSearchBarItemsValuesGroup,
              value
            ]
          }
        } else {
          searchBarItemsMap[name] = [...searchBarItemsGroup, { text: value }]
        }
      }

      Object.entries(searchBarValuesMap).forEach(([categoryName, values]) => {
        const category = getCategory(categoriesMap, categoryName)

        values.forEach(value => classifySearchBarValue(value, category))
      })

      return [searchBarItemsMap, incompleteSearchBarItemsValuesMap]
    }, [categoriesMap, searchBarValuesMap, bufferedSearchBarOptions])

  const loading = categories?.some(
    category => category.getItemsByIdResult?.loading
  )

  const error = categories?.find(category => category.getItemsByIdResult?.error)
    ?.getItemsByIdResult?.error

  if (error) {
    throw error
  }

  const [notFoundAfterRequest, setNotFoundAfterRequest] =
    useState<SearchBarOptionType | null>(null)

  if (notFoundAfterRequest) {
    const item = notFoundAfterRequest.value as Item

    // This avoids infinite loop in case of item not found after request.
    // It needs to be outside async code to be caught by error boundary.
    throw new Error(
      `Searchbar item from category \`${notFoundAfterRequest.category.label}\` with id \`${item.text}\` not found after requesting for it`
    )
  }

  useEffect(() => {
    if (loading || !incompleteSearchBarItemsValuesMapMemoized) {
      return
    }

    const findNotFoundAfterRequest = (
      foundItems: Item[],
      category: SearchBarCategory
    ) => {
      const foundItemsValues = foundItems.map(({ text }) => text)
      const notFoundItemValue = incompleteSearchBarItemsValuesMapMemoized?.[
        category.name
      ].find(itemValue => !foundItemsValues.includes(itemValue))

      if (notFoundItemValue) {
        // Can't throw in here, it is async code, not caught by error boundary
        setNotFoundAfterRequest({
          value: { text: notFoundItemValue },
          category
        })
      }
    }

    const requestItemsById = async (
      optionValues: string[],
      category: SearchBarCategory
    ) => {
      const result = await category.getItemsByIdResult?.getItems(optionValues)

      if (!result?.data) {
        return
      }

      findNotFoundAfterRequest(result.data, category)

      const newSearchBarOptions = result.data.map(value => ({
        value,
        category
      }))

      setBufferedSearchBarOptions(previousBufferedSearchBarOptions => [
        ...previousBufferedSearchBarOptions,
        ...newSearchBarOptions
      ])
    }

    Object.entries(incompleteSearchBarItemsValuesMapMemoized).forEach(
      ([categoryName, values]) => {
        const category = getCategory(categoriesMap, categoryName)

        requestItemsById(values, category)
      }
    )
  }, [incompleteSearchBarItemsValuesMapMemoized, loading, categoriesMap])

  const bufferNewSearchBarOption = useCallback(
    (newFilterValues: Record<string, unknown>) => {
      const newSearchBarItems = newFilterValues[SEARCH_BAR_URL_PARAM_NAME] as
        | Record<string, Item[]>
        | undefined

      if (!newSearchBarItems) {
        return newFilterValues
      }

      Object.entries(newSearchBarItems).find(([categoryName, items]) => {
        const category = getCategory(categoriesMap, categoryName)

        const needsToBufferItems = Boolean(category.getItemsByIdResult)

        if (!needsToBufferItems) {
          return false
        }

        const bufferedItems = bufferedSearchBarOptions
          .filter(({ category: { name } }) => name === categoryName)
          .map(({ value }) => value)

        const newItem = items.find(item => !bufferedItems.includes(item))

        if (newItem) {
          setBufferedSearchBarOptions(previousBufferedItems => [
            ...previousBufferedItems,
            { value: newItem, category }
          ])

          return true
        }

        return false
      })
    },
    [categoriesMap, bufferedSearchBarOptions]
  )

  const filterValues: Record<string, unknown> = useMemo(
    () => ({
      ...filterUrlValues,
      [SEARCH_BAR_URL_PARAM_NAME]: searchBarItemsMapMemoized
    }),
    [filterUrlValues, searchBarItemsMapMemoized]
  )

  const filterValuesLoading =
    incompleteSearchBarItemsValuesMapMemoized &&
    Object.keys(incompleteSearchBarItemsValuesMapMemoized).length > 0

  return {
    filterValues,
    filterValuesLoading,
    bufferNewSearchBarOption
  }
}

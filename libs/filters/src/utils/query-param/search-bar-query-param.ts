import { ApolloClient } from '@staff-portal/data-layer-service'
import { asQueryParam } from '@staff-portal/query-params-state'

import {
  SearchBarCategory,
  SearchBarCategoryQueryParams,
  FilterObject
} from '../../components/SearchBar'

const getCategoriesByName = (categories: SearchBarCategory[]) =>
  Object.fromEntries(categories.map(category => [category.name, category]))

const encodeCategory = (
  category: SearchBarCategory,
  filters: FilterObject[]
) => {
  const { toQueryParams, toQueryParam } = category

  if (toQueryParams) {
    return toQueryParams(filters)
  } else if (toQueryParam) {
    return filters.map(toQueryParam)
  }

  throw new Error(
    `Please specify "toQueryParam" or "toQueryParams" setting for "${category.name}" search category`
  )
}

const encode =
  (categories: SearchBarCategory[]) =>
  (value: Record<string, FilterObject[]>) => {
    const encodedValues: Record<string, SearchBarCategoryQueryParams> = {}
    const categoriesByName = getCategoriesByName(categories)

    for (const key of Object.keys(categoriesByName)) {
      const category = categoriesByName[key]
      const filters = value[key]

      if (filters && Array.isArray(filters)) {
        encodedValues[key] = encodeCategory(category, filters)
      }
    }

    return encodedValues
  }

const decodeArrayCategory = async (
  category: SearchBarCategory,
  queryParams: string[],
  client?: ApolloClient<object>
) => {
  const { fromQueryParam, fromQueryParams, queryByParams } = category

  // we can decode with promise
  if (queryByParams && client) {
    return (await queryByParams(queryParams, client)).data
    // we can decode by mapping over array items
  } else if (fromQueryParam) {
    return queryParams.map(fromQueryParam)
    // we can decode the whole array
  } else if (fromQueryParams) {
    return fromQueryParams(queryParams)
  }

  throw new Error(
    `Please specify "fromQueryParam" or "fromQueryParams" or "queryByParams" setting for "${category.name}" search category`
  )
}

const decodeCategory = async (
  category: SearchBarCategory,
  queryParams: SearchBarCategoryQueryParams,
  client?: ApolloClient<object>
) => {
  if (typeof queryParams === 'string') {
    return decodeArrayCategory(category, [queryParams], client)
  }

  if (Array.isArray(queryParams)) {
    return decodeArrayCategory(category, queryParams, client)
  }

  const { fromQueryParams } = category

  if (fromQueryParams) {
    return fromQueryParams(queryParams)
  }

  throw new Error(
    `Please specify "fromQueryParams" setting for "${category.name}" search category`
  )
}

const decode =
  (categories: SearchBarCategory[], client?: ApolloClient<object>) =>
  async (encodedValues: Record<string, SearchBarCategoryQueryParams>) => {
    const decodedValues: Record<string, FilterObject[]> = {}
    const categoriesByName = getCategoriesByName(categories)

    for (const key of Object.keys(categoriesByName)) {
      const category = categoriesByName[key]
      const queryParams = encodedValues[key]

      if (!queryParams) {
        continue
      }

      decodedValues[key] = await decodeCategory(category, queryParams, client)
    }

    return decodedValues
  }

export const searchBarQueryParam = (
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  categories: SearchBarCategory<any>[],
  client?: ApolloClient<object>
) =>
  asQueryParam({
    encode: encode(categories),
    decode: decode(categories, client)
  })

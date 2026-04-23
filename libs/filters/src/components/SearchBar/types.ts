import { Item } from '@toptal/picasso/Autocomplete'
import { ReactNode, FC } from 'react'
import { ApolloClient } from '@staff-portal/data-layer-service'

export interface QueryByResult<T = {}> {
  data: T[]
  errors?: readonly Error[]
}

type CustomExecutionResult<TData> = { data: TData | undefined }

export interface GetItemsByIdResult {
  getItems: (ids: string[]) => Promise<CustomExecutionResult<Item[]>>
  loading: boolean
  error: Error | undefined
}

type SearchBarCategoryType = 'autocomplete' | 'input' | 'multi-autocomplete'
export type SearchBarCategoryQueryParams =
  | string
  | string[]
  | Record<string, string[]>

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export interface SearchBarCategory<FilterObject = any> {
  name: string
  label?: string
  type?: SearchBarCategoryType
  // Query Params ------
  toQueryParam?: (item: FilterObject) => string
  toQueryParams?: (items: FilterObject[]) => SearchBarCategoryQueryParams
  /** fromQueryParam can be undefined when queryByParams method specified instead **/
  fromQueryParam?: (value: string) => FilterObject
  fromQueryParams?: (params: SearchBarCategoryQueryParams) => FilterObject[]
  queryByParams?: (
    params: string[],
    client: ApolloClient<object>
  ) => Promise<QueryByResult<FilterObject>>
  fromInputValue?: (value: string) => FilterObject
  // ------
  // Badges ------
  getBadgeLabel: (item: FilterObject) => string
  BadgeComponent?: FC<{
    value: FilterObject
    onBadgeChange: (badge: FilterObject) => void
    onBadgeDelete: () => void
  }>
  // ------
  // FilterObject ------
  getKey: (item: FilterObject) => string
  // ------
  /** @deprecated method, queryByParams should be used instead **/
  getItemsByIdResult?: GetItemsByIdResult
}

export interface BaseAutocompleteSearchBarCategory<
  FilterObject,
  AutocompleteOption
> extends SearchBarCategory<FilterObject> {
  numberOfAutocompleteResults?: number
  getOptions: (
    inputValue: string,
    limit: number,
    client: ApolloClient<object>
  ) => Promise<QueryByResult>
  getOptionKey: (item: AutocompleteOption) => string
  renderOption: (item: AutocompleteOption, index: number) => ReactNode
  fromInputValue?: (value: string) => FilterObject
}

export interface AutocompleteSearchBarCategory<
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  FilterObject = any,
  AutocompleteOption = Item
> extends BaseAutocompleteSearchBarCategory<FilterObject, AutocompleteOption> {
  fromOption: (option: AutocompleteOption) => FilterObject
}

type FilterObjectWithCategory<F> = F extends FilterObject
  ? { value: F; category: SearchBarCategory<F> }
  : never

// Autocomplete that serves filter values for multiple number of categories
// TODO: Maybe we need to separate autocomplete categories and search bar categories
// and work with them as with separate entities? // cc. Sergey Shishkalov
export interface MultiAutocompleteSearchBarCategory<
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  FilterObject = any,
  AutocompleteOption = Item,
  SecondaryFilterObjects = FilterObject
> extends BaseAutocompleteSearchBarCategory<FilterObject, AutocompleteOption> {
  fromOption: (
    option: AutocompleteOption
  ) => FilterObjectWithCategory<SecondaryFilterObjects>
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type SearchBarCategories<FilterObject = any> =
  SearchBarCategory<FilterObject>[]

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type FilterObject = any

/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow */
export interface SearchBarOption<FilterObject = any> {
  value: FilterObject
  category: SearchBarCategory<FilterObject>
}

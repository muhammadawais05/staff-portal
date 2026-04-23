import {
  AutocompleteSearchBarCategory,
  MultiAutocompleteSearchBarCategory,
  SearchBarCategory
} from '../components/SearchBar'
import { WithOptional } from '../types'

export const createAutocompleteCategory = <FilterObject, AutocompleteOption>(
  category: AutocompleteSearchBarCategory<FilterObject, AutocompleteOption>
) => {
  category.type = 'autocomplete'

  return category
}

export const createMultiAutocompleteCategory = <
  FilterObject,
  AutocompleteOption,
  SecondaryFilterObjects = FilterObject
>(
  category: MultiAutocompleteSearchBarCategory<
    FilterObject,
    AutocompleteOption,
    SecondaryFilterObjects
  >
) => {
  category.type = 'multi-autocomplete'

  return category
}

const identity = (value: string) => value
const ignoreParams = () => []

export const createInputCategory = (
  category: WithOptional<
    SearchBarCategory<string>,
    'getKey' | 'toQueryParam' | 'getBadgeLabel'
  >
) => {
  return {
    ...category,
    type: 'input' as const,
    getKey: category.getKey || identity,
    toQueryParam: category.toQueryParam || identity,
    fromQueryParam: category.fromQueryParam || identity,
    // We should ignore filters that does not support query params,
    // this will prevent throwing errors when the params in the URL
    // are invalid for a specific filter
    fromQueryParams: category.fromQueryParams || ignoreParams,
    fromInputValue: category.fromInputValue || identity,
    getBadgeLabel: category.getBadgeLabel || identity
  }
}

export const isAutocompleteSearchBarCategory = (
  category: SearchBarCategory
): category is AutocompleteSearchBarCategory => {
  return (category as AutocompleteSearchBarCategory).type === 'autocomplete'
}

export const isMultiAutocompleteSearchBarCategory = (
  category: SearchBarCategory
): category is MultiAutocompleteSearchBarCategory => {
  return (
    (category as MultiAutocompleteSearchBarCategory).type ===
    'multi-autocomplete'
  )
}

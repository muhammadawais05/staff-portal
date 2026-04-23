import { noop } from '@toptal/picasso/utils'

const wrappedFunction = () => (value: unknown) => value

export const filterOptions = () => {
  throw new Error('test')
}

export const createAutocompleteCategory = category => {
  category.type = 'autocomplete'

  return category
}

export const createInputCategory = (category: { type: string }) => {
  category.type = 'input'

  return category
}

export const SearchBarGqlParam =
  () => (values: unknown, urlValues: unknown) => ({
    values,
    urlValues
  })

export const getPaginationOffset = noop

export const badgesToGql = (value: unknown) => value

export const BigDecimalRangeGqlParam = wrappedFunction
export const dataQueryParam = wrappedFunction
export const DateRangeGqlParam = wrappedFunction
export const EnumToGqlParam = wrappedFunction

export const gqlIdQueryParam = wrappedFunction
export const HiddenToGqlParam = wrappedFunction
export const IdGqlParam = wrappedFunction
export const toGqlFilter = noop
export const toGqlPagination = noop
export const searchBarQueryParam = wrappedFunction

export { default as Filters } from './Filters'
export { default as Pagination } from './Pagination'
export { default as SearchBar } from './SearchBar'

export declare enum FilterConfigType {
  CHECKBOX = 'CHECKBOX',
  CITY = 'CITY',
  DATE_RANGE = 'DATE_RANGE',
  HIDDEN = 'HIDDEN',
  RADIO = 'RADIO',
  PRESET = 'PRESET',
  SELECT = 'SELECT',
  SLIDER_RANGE = 'SLIDER_RANGE'
}

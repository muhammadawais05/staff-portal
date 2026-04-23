import { SearchBarGqlParam } from './searchbarToGql'
import { AutocompleteOption } from './autocomplete'
import { getAutocompleteNodeFor } from '../../_lib/filters/filters-builders'

export type Model<T = string> = Record<
  string,
  T | [T, (value: string) => string]
>

/**
 * Changes the keys of an object to other keys based on the passed model param
 * @param searchModel an object that its keys are the match to replace
 * and its values the final property name
 * @example searchModel: { some_key: someKey }
 */
export const mapSearchParams =
  (searchModel: Model) =>
  (values = {}, urlValues = {}) => {
    const remappedValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        const searchValue = searchModel[key]
        const searchKey = searchValue
          ? typeof searchValue === 'string'
            ? searchValue
            : searchValue[0]
          : key

        return { ...acc, [searchKey]: value }
      },
      {}
    )

    return {
      values: remappedValues,
      urlValues: {
        ...urlValues,
        badges: remappedValues
      }
    }
  }

export const configureSearchParams =
  (model: Model) =>
  <Filter>(values: unknown, urlValues: unknown) => {
    const { values: newValues, urlValues: newUrlValues } = mapSearchParams(
      model
    )(values as object, urlValues as object)

    const convertModel = {
      ...Object.values(model).reduce((acc, value) => {
        const isPlainValue = typeof value === 'string'
        const key = (isPlainValue ? value : value[0]) as string
        const converter = isPlainValue
          ? getAutocompleteNodeFor('id')
          : value?.[1] || getAutocompleteNodeFor('id')

        return {
          ...acc,
          [key]: converter
        }
      }, {}),
      jobTitles: getAutocompleteNodeFor('label')
    }

    return SearchBarGqlParam<Filter, AutocompleteOption, string>(convertModel)(
      newValues,
      newUrlValues
    )
  }

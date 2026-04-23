import { Item } from '@toptal/picasso/Autocomplete'
import * as config from '@staff-portal/config'

import { AutocompleteSearchBarCategory } from '../components/SearchBar'
import {
  filterOptions,
  takeNOptions,
  sortOptions
} from './search-bar-autocomplete'

jest.mock('@staff-portal/config', () => ({
  __esModule: true,
  get DEFAULT_AUTOCOMPLETE_RESULTS_SIZE() {
    return 0
  }
}))

describe('SearchBarAutocomplete utils', () => {
  describe('filterOptions', () => {
    const activeCategory = {
      fromOption: (option: Item) => ({ filterValueId: option.id }),
      getKey: ({ filterValueId }: { filterValueId: number }) =>
        String(filterValueId)
    } as AutocompleteSearchBarCategory

    it('does not filter anything if there are no exclude values', () => {
      const options = [{ text: '1' }, { text: '2' }, { text: '3' }]

      const result = filterOptions({
        data: options,
        excludeFilters: [],
        activeCategory
      })

      expect(result).toEqual(options)
    })

    it('filters excluded values from the options', () => {
      const options = [
        { id: 1, text: '11' },
        { id: 2, text: '22' },
        { id: 3, text: '33' }
      ]
      const excludeFilters = [
        { value: { filterValueId: 2 }, category: activeCategory }
      ]
      const expectedOptions = [
        { id: 1, text: '11' },
        { id: 3, text: '33' }
      ]

      const result = filterOptions({
        data: options,
        excludeFilters,
        activeCategory
      })

      expect(result).toEqual(expectedOptions)
    })

    it('returns empty array if original list is empty', () => {
      const options: Item[] = []
      const excludeFilters = [
        { value: { filterValueId: 2 }, category: activeCategory }
      ]
      const expectedOptions: Item[] = []

      const result = filterOptions({
        data: options,
        excludeFilters,
        activeCategory
      })

      expect(result).toEqual(expectedOptions)
    })

    it('does not filter anything if data does not include exclude values', () => {
      const options = [
        { id: 1, text: '11' },
        { id: 2, text: '22' },
        { id: 3, text: '33' }
      ]
      const idNotInList = 8
      const excludeFilters = [
        { value: { filterValueId: idNotInList }, category: activeCategory }
      ]

      const result = filterOptions({
        data: options,
        excludeFilters,
        activeCategory
      })

      expect(result).toEqual(options)
    })
  })

  describe('takeNOptions', () => {
    it('takes default number of options', () => {
      const options = [{ text: '1' }, { text: '2' }, { text: '3' }]
      const expectedOptions = [{ text: '1' }, { text: '2' }]
      const resultsCount = 2
      const autocompleteResultsSizeSpy = jest.spyOn(
        config,
        'DEFAULT_AUTOCOMPLETE_RESULTS_SIZE',
        'get'
      )

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      autocompleteResultsSizeSpy.mockReturnValueOnce(resultsCount)

      const result = takeNOptions(options)

      expect(result).toEqual(expectedOptions)
    })

    it('takes number of options specified by the count', () => {
      const options = [{ text: '1' }, { text: '2' }, { text: '3' }]
      const expectedOptions = [{ text: '1' }]
      const resultsCount = 1

      const result = takeNOptions(options, resultsCount)

      expect(result).toEqual(expectedOptions)
    })
  })

  describe('sortOptions', () => {
    it('returns empty array if original list is empty', () => {
      const items: Item[] = []

      const result = sortOptions(items, 'test', 'label')

      expect(result).toEqual(items)
    })

    it('doesnt sort list of items if query is empty string', () => {
      const items: Item[] = [
        { label: 'abc' },
        { label: 'ABC' },
        { label: 'efg' }
      ]

      const result = sortOptions(items, '', 'label')

      expect(result).toEqual(items)
    })

    it('sorts items based on query', () => {
      const items: Item[] = [
        { label: '123' },
        { label: '123 ABC' },
        { label: '123 abc' },
        { label: 'abc' },
        { label: 'ABC' },
        { label: 'efg' }
      ]

      const expectedBeginsWith: Item[] = [{ label: 'abc' }, { label: 'ABC' }]

      const expectedCaseSensitive: Item[] = [{ label: '123 ABC' }]

      const expectedRest: Item[] = [
        { label: '123' },
        { label: '123 abc' },
        { label: 'efg' }
      ]

      const expectedResult: Item[] = [
        ...expectedBeginsWith,
        ...expectedCaseSensitive,
        ...expectedRest
      ]

      const result = sortOptions(items, 'AB', 'label')

      expect(result).toEqual(expectedResult)
    })
  })
})

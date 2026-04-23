import React from 'react'
import { render, act } from '@testing-library/react'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { useApolloClient } from '@staff-portal/data-layer-service'
import { TestWrapper, noop } from '@staff-portal/test-utils'

import SearchBarAutocomplete from './SearchBarAutocomplete'
import {
  filterOptions,
  takeNOptions
} from '../../utils/search-bar-autocomplete'

jest.mock('@staff-portal/ui', () => ({
  Autocomplete: () => null
}))

jest.mock('../SearchBarCategorySelector', () => ({
  __esModule: true,
  default: () => null
}))

jest.mock('../../utils/search-bar-autocomplete')

jest.mock('@apollo/client')

const activeCategoryLabel = 'category label'
const mockedActiveCategory = {
  getOptions: () =>
    Promise.resolve({
      data: [
        {
          text: 'option 1'
        }
      ]
    }),
  getOptionKey: () => 'key',
  renderOption: () => null,
  fromOption: () => {},
  label: activeCategoryLabel,
  name: 'name',
  toQueryParam: () => 'query param',
  getBadgeLabel: () => 'badge label',
  getKey: () => 'key'
}

describe('SearchBarAutocomplete', () => {
  it('renders Autocomplete with options when user typing some value', async () => {
    const typingValue = 'some keyword'
    const mockApolloClient = {}
    const mockedGetOptionsResult = [
      {
        text: 'option 1'
      },
      {
        text: 'option 2'
      }
    ]
    const mockedFilteredOptions = [mockedGetOptionsResult[0]]

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useApolloClient.mockReturnValue(mockApolloClient)

    const getOptionsPromise = Promise.resolve({ data: mockedGetOptionsResult })
    const mockedGetOptions = jest.spyOn(mockedActiveCategory, 'getOptions')

    mockedGetOptions.mockReturnValueOnce(getOptionsPromise)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    filterOptions.mockReturnValueOnce(mockedFilteredOptions)

    render(
      <TestWrapper>
        <SearchBarAutocomplete
          value={typingValue}
          activeCategory={mockedActiveCategory}
          categories={[]}
          onChange={noop}
          onSelect={noop}
          onOtherOption={noop}
          onCategoryChange={noop}
          selectedFilters={[]}
        />
      </TestWrapper>
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await act(() => getOptionsPromise)

    expect(mockedGetOptions).toHaveBeenCalledWith(
      typingValue,
      DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
      mockApolloClient
    )
    expect(filterOptions).toHaveBeenCalledWith({
      data: mockedGetOptionsResult,
      excludeFilters: [],
      activeCategory: expect.objectContaining({})
    })
    expect(takeNOptions).toHaveBeenCalledWith(
      mockedFilteredOptions,
      DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
    )
  })
})

import { act, renderHook } from '@testing-library/react-hooks'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import {
  useGetAutocompleteOptions,
  DROPDOWN_RESULTS_LIMIT
} from './useGetAutocompleteOptions'
import { useQueryAutocompleteLazyQuery } from '../../data'
import { useGetData, useGetNode, useGetNodes } from '.'

jest.mock('../../data')

describe('GQL query data helper', () => {
  describe('#useGetData', () => {
    describe('when `initialLoading` is `true`', () => {
      it('works properly', () => {
        const mockHook = jest.fn().mockReturnValue({
          data: undefined,
          error: false,
          loading: true
        })
        const mockResult = {
          data: undefined,
          error: false,
          loading: true,
          refetch: undefined
        }

        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          useGetData<any, any>(mockHook, 'custom')(
            { test: 'abc' },
            { fetchPolicy: 'network-only' }
          )
        ).toEqual(mockResult)
      })
    })

    it('works properly', () => {
      const mockData = { foo: 'bar' }
      const mockHook = jest.fn().mockReturnValue({
        data: { custom: mockData },
        error: false,
        loading: false
      })
      const mockResult = {
        data: mockData,
        error: false,
        loading: false,
        refetch: undefined
      }

      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useGetData<any, any>(mockHook, 'custom')(
          { test: 'abc' },
          { fetchPolicy: 'network-only' }
        )
      ).toEqual(mockResult)
    })
  })

  describe('#useGetNode', () => {
    it('works properly', () => {
      const mockData = { foo: 'bar' }
      const mockHook = jest.fn().mockReturnValue({
        data: { node: mockData },
        error: false,
        loading: false
      })
      const mockResult = {
        data: mockData,
        error: false,
        loading: false,
        refetch: undefined
      }

      expect(useGetNode(mockHook)({ test: 'abc' })).toEqual(mockResult)
    })
  })

  describe('#useGetNodes', () => {
    it('works properly', () => {
      const mockData = [{ foo: 'bar' }]
      const mockHook = jest.fn().mockReturnValue({
        data: { nodes: mockData },
        error: false,
        loading: false
      })
      const mockResult = {
        data: mockData,
        error: false,
        loading: false,
        refetch: undefined
      }

      expect(useGetNodes(mockHook)({ test: 'abc' })).toEqual(mockResult)
    })
  })

  describe('#useGetAutocompleteOptions', () => {
    const autocompleteLazyQueryMock = useQueryAutocompleteLazyQuery as jest.Mock

    it('returns data on request', () => {
      const requestOptionsMock = jest.fn()

      autocompleteLazyQueryMock.mockImplementation(() => [
        requestOptionsMock,
        {
          data: { autocomplete: { edges: ['foo'] } },
          loading: false
        }
      ])

      const { result } = renderHook(() =>
        useGetAutocompleteOptions(AutocompleteModels.QUICK_SEARCH)
      )

      act(() => result.current.getOptionsDebounced('test'))

      expect(requestOptionsMock).toHaveBeenCalledWith({
        variables: {
          term: 'test',
          model: AutocompleteModels.QUICK_SEARCH,
          offset: 0,
          limit: DROPDOWN_RESULTS_LIMIT
        }
      })
      expect(result.current.options).toEqual(['foo'])
    })

    it('returns empty array if no data found via request', () => {
      const requestOptionsMock = jest.fn()

      autocompleteLazyQueryMock.mockImplementation(() => [
        requestOptionsMock,
        {
          data: undefined,
          loading: false
        }
      ])

      const { result } = renderHook(() =>
        useGetAutocompleteOptions(AutocompleteModels.QUICK_SEARCH)
      )

      act(() => result.current.getOptionsDebounced('test'))

      expect(requestOptionsMock).toHaveBeenCalledWith({
        variables: {
          term: 'test',
          model: AutocompleteModels.QUICK_SEARCH,
          offset: 0,
          limit: DROPDOWN_RESULTS_LIMIT
        }
      })
      expect(result.current.options).toEqual([])
    })
  })
})

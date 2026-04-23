import { act, renderHook } from '@testing-library/react-hooks'

import { useHistory, useLocation } from '..'
import { useQueryParams } from './use-query-params'

const mockHistoryReplace = jest.fn()

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useHistory: jest.fn()
}))

const mockUseLocation = useLocation as jest.Mock
const mockUseHistory = useHistory as jest.Mock

describe('#useQueryParams', () => {
  beforeEach(() => {
    mockUseHistory.mockReturnValue({
      replace: mockHistoryReplace
    })
  })

  describe('returns string url params', () => {
    it('one param', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=My+string+param'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string'
        })
      )

      const { current } = result

      expect(current[0]).toEqual({
        param1: 'My string param'
      })
    })

    it('two params', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=My+string+param&param2=value2'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string',
          param2: 'string'
        })
      )

      const { current } = result

      expect(current[0]).toEqual({
        param1: 'My string param',
        param2: 'value2'
      })
    })
  })

  describe('returns number url params', () => {
    it('one param', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=1'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'number'
        })
      )

      const { current } = result

      expect(current[0]).toEqual({
        param1: 1
      })
    })

    it('two params', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=0&param2=-1'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'number',
          param2: 'number'
        })
      )

      const { current } = result

      expect(current[0]).toEqual({
        param1: 0,
        param2: -1
      })
    })
  })

  describe('returns array params', () => {
    it('values separated by comma', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=a,b,c'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string[]'
        })
      )

      const { current } = result

      expect(current[0]).toEqual({
        param1: ['a,b,c']
      })
    })

    it('every array item has same key', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=a&param1=b'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string[]'
        })
      )

      const { current } = result

      expect(current[0]).toEqual({
        param1: ['a', 'b']
      })
    })

    // Uncomment this test as soon as the centralized parsing arrays will be done.
    // Platform use exactly same syntax for storing arrays in query params.
    // When we make this and below skipped tests work we can use this hook in filters
    it.skip('every array item has same key with brackets', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1[]=a&param1[]=b'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string[]'
        })
      )

      const { current } = result

      expect(current[0]).toEqual({
        param1: ['a', 'b']
      })
    })
  })

  describe('sets string params', () => {
    it('to empty search', () => {
      mockUseLocation.mockReturnValue({
        search: ''
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string',
          param2: 'string'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param1: 'val1', param2: 'val2' })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1=val1&param2=val2'
      })
    })

    it('to not empty search', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=val1&param2=val2'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param3: 'string'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param3: 'val3' })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1=val1&param2=val2&param3=val3'
      })
    })

    it('with replace of existing params', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=val1&param2=val2'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param1: 'newVal1' })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1=newVal1&param2=val2'
      })
    })
  })

  describe('sets number params', () => {
    it('to empty search', () => {
      mockUseLocation.mockReturnValue({
        search: ''
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'number',
          param2: 'number',
          param3: 'number'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param1: -1, param2: 0, param3: 1 })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1=-1&param2=0&param3=1'
      })
    })

    it('to not empty search', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=-1'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param2: 'number',
          param3: 'number'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param2: 0, param3: 1 })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1=-1&param2=0&param3=1'
      })
    })

    it('with replace of existing params', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=-1&param2=0&param3=1'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'number'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param1: 6 })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1=6&param2=0&param3=1'
      })
    })
  })

  describe('sets array params', () => {
    it.skip('to empty search', () => {
      mockUseLocation.mockReturnValue({
        search: ''
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string[]',
          param2: 'string[]'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param1: ['1', '2'], param2: ['a', 'b'] })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1[]=1&param1[]=2&param2[]=a&param2[]=b'
      })
    })

    it.skip('to not empty search', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=test'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param2: 'string[]'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param2: ['a', 'b'] })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1=test&param2[]=a&param2[]=b'
      })
    })

    it.skip('with replace of existing params', () => {
      mockUseLocation.mockReturnValue({
        search: 'param1=test'
      })
      const { result } = renderHook(() =>
        useQueryParams({
          param1: 'string[]'
        })
      )

      act(() => {
        const { current } = result

        const setValues = current[1]

        setValues({ param1: ['a', 'b'] })
      })

      expect(mockHistoryReplace).toHaveBeenCalledWith({
        search: 'param1[]=a&param1[]=b'
      })
    })
  })
})

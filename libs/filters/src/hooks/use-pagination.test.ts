import {
  QueryParams,
  useQueryParamsState
} from '@staff-portal/query-params-state'
import { act, renderHook } from '@testing-library/react-hooks'

import { usePagination } from './use-pagination'

jest.mock('@staff-portal/query-params-state', () => ({
  ...jest.requireActual('@staff-portal/query-params-state'),
  useQueryParamsState: jest.fn()
}))

const useQueryParamsStateMock = useQueryParamsState as jest.Mock

describe('#usePagination', () => {
  describe('#normalizePage', () => {
    it('redirects to the first page if there is only 1 page, but we are going to the 2nd', () => {
      const urlValues = { page: 2 }
      const setUrlValues = jest.fn()

      useQueryParamsStateMock.mockImplementation(() => [
        urlValues,
        setUrlValues
      ])

      const totalCount = 1
      const limit = 1

      const { result } = renderHook(() => usePagination({ limit }))

      act(() => result.current.normalizePage(totalCount))

      expect(setUrlValues).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1 })
      )
    })

    it('redirects to the first page if page is not a number', () => {
      const urlValues = { page: 'asdasd' }
      const setUrlValues = jest.fn()

      useQueryParamsStateMock.mockImplementation(() => [
        urlValues,
        setUrlValues
      ])

      const totalCount = 1
      const limit = 1

      const { result } = renderHook(() => usePagination({ limit }))

      act(() => result.current.normalizePage(totalCount))

      expect(setUrlValues).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1 })
      )
    })

    it('redirects to the first page if limit is lower than total amount', () => {
      const urlValues = { page: 3 }
      const setUrlValues = jest.fn()

      useQueryParamsStateMock.mockImplementation(() => [
        urlValues,
        setUrlValues
      ])

      const totalCount = 50
      const limit = 100

      const { result } = renderHook(() => usePagination({ limit }))

      act(() => result.current.normalizePage(totalCount))

      expect(setUrlValues).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1 })
      )
    })

    it('does not redirect if there are 10 pages and we are going to 3rd', () => {
      const urlValues = { page: 3 }
      const setUrlValues = jest.fn()

      useQueryParamsStateMock.mockImplementation(() => [
        urlValues,
        setUrlValues
      ])

      const totalCount = 1000
      const limit = 100

      const { result } = renderHook(() => usePagination({ limit }))

      act(() => result.current.normalizePage(totalCount))

      expect(setUrlValues).toHaveBeenCalledTimes(0)
    })

    describe('when normalize function is provided', () => {
      it('passes it to use query params state', () => {
        const NORMALIZE_FILTERS = Symbol() as unknown as () => QueryParams

        renderHook(() =>
          usePagination({ limit: 100, normalizeFilters: NORMALIZE_FILTERS })
        )

        expect(useQueryParamsStateMock).toHaveBeenCalledWith(
          expect.anything(),
          NORMALIZE_FILTERS
        )
      })
    })
  })
})

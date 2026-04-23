import { renderHook } from '@testing-library/react-hooks'
import { usePagination } from '@staff-portal/filters'

import useHandleQuizzesFilters from './use-handle-quizzes-filters'

jest.mock('@staff-portal/filters')

const mockPagination = usePagination as jest.Mock

const pageMock = 1
const filterValuesMock = {
  firstParam: 'firstValue',
  secondParam: ['secondValue', 'thirdValue']
}

const handlePageChangeMock = jest.fn()
const handleFilterChangeMock = jest.fn()

describe('useHandleQuizzesFilters', () => {
  it('returns correct values', () => {
    mockPagination.mockImplementation(() => ({
      page: pageMock,
      filterValues: {
        ...filterValuesMock
      },
      handlePageChange: handlePageChangeMock,
      handleFilterChange: handleFilterChangeMock,
      resolving: false
    }))

    const { result } = renderHook(() => useHandleQuizzesFilters())

    expect(result.current).toEqual({
      page: pageMock,
      filterValues: {
        firstParam: filterValuesMock.firstParam,
        secondParam: filterValuesMock.secondParam
      },
      resolvingFilters: false,
      handlePageChange: expect.any(Function),
      handleFilterChange: expect.any(Function)
    })
  })
})

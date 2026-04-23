import { renderHook } from '@testing-library/react-hooks'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientAnnualRevenueDocument } from '../data'
import { getClientAnnualRevenueHook } from './get-client-annual-revenue-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('getClientAnnualRevenueHook', () => {
  it('returns result a function which invoked useLazyQuery with expected params', () => {
    const requestMock = 'request'
    const lazyQueryReturnObjectMock = {
      data: 'data',
      loading: 'loading',
      called: 'called',
      error: 'error'
    }

    mockUseLazyQuery.mockReturnValue([requestMock, lazyQueryReturnObjectMock])

    const useHook = getClientAnnualRevenueHook('test-id')

    const {
      result: { current }
    } = renderHook(() => useHook())

    expect(mockUseLazyQuery).toHaveBeenCalledTimes(1)
    expect(mockUseLazyQuery).toHaveBeenCalledWith(
      GetClientAnnualRevenueDocument,
      { variables: { clientId: 'test-id' } }
    )
    expect(current).toEqual({
      request: requestMock,
      ...lazyQueryReturnObjectMock,
      data: ''
    })
  })
})

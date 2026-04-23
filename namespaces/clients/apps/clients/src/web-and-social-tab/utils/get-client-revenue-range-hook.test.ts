import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientRevenueRangeDocument } from '../data'
import { getClientRevenueRangeHook } from './get-client-revenue-range-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientRevenueRangeHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientRevenueRangeDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { revenueRange: 'test range' } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientRevenueRangeHook('test'))

    expect(current().data).toBe('test range')
  })
})

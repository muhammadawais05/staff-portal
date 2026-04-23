import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientRevenueRangesDocument } from '../data'
import { useGetClientRevenueRanges } from './use-get-client-revenue-ranges'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#useClientRevenueRanges', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientRevenueRangesDocument)
      .mockImplementation(() => [
        () => ({}),
        {
          data: { clientRevenueRanges: ['4', '5', '6'] },
          loading: false
        }
      ])

    const {
      result: {
        current: { data }
      }
    } = renderHook(() => useGetClientRevenueRanges())

    expect(data).toStrictEqual([
      { value: '4', text: '4' },
      { value: '5', text: '5' },
      { value: '6', text: '6' }
    ])
  })
})

import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'
import { GetClientIndustriesDocument } from '@staff-portal/clients'

import { useGetClientIndustries } from './use-get-client-industries'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#useGetClientIndustries', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientIndustriesDocument)
      .mockImplementation(() => [
        () => ({}),
        {
          data: { clientIndustries: ['1', '2', '3'] },
          loading: false
        }
      ])

    const {
      result: {
        current: { data }
      }
    } = renderHook(() => useGetClientIndustries())

    expect(data).toStrictEqual([
      { value: '1', text: '1' },
      { value: '2', text: '2' },
      { value: '3', text: '3' }
    ])
  })
})

import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientIndustryDocument } from '../data'
import { getClientIndustryHook } from './get-client-industry-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientIndustryHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientIndustryDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { industry: 'test industry' } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientIndustryHook('test'))

    expect(current().data).toBe('test industry')
  })
})

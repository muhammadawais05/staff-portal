import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientSecondaryIndustryDocument } from '../data'
import { getClientSecondaryIndustryHook } from './get-client-secondary-industry-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientSecondaryIndustryHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientSecondaryIndustryDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { secondaryIndustry: 'test industry' } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientSecondaryIndustryHook('test'))

    expect(current().data).toBe('test industry')
  })
})

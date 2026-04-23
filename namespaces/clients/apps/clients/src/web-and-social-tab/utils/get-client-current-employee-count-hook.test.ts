import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientCurrentEmployeeCountDocument } from '../data'
import { getClientCurrentEmployeeCountHook } from './get-client-current-employee-count-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientCurrentEmployeeCountHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientCurrentEmployeeCountDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { currentEmployeeCount: '100' } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientCurrentEmployeeCountHook('test'))

    expect(current().data).toBe('100')
  })
})

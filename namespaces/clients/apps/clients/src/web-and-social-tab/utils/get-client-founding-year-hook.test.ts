import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientFoundingYearDocument } from '../data'
import { getClientFoundingYearHook } from './get-client-founding-year-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientFoundingYearHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientFoundingYearDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { foundingYear: '2020' } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientFoundingYearHook('test'))

    expect(current().data).toBe('2020')
  })
})

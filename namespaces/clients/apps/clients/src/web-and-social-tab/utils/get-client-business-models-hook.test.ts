import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientBusinessModelsDocument } from '../data'
import { getClientBusinessModelsHook } from './get-client-business-models-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientBusinessModelsHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientBusinessModelsDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { businessModels: ['B2B'] } },
          loading: false,
          called: false
        }
      ])

    const useHook = getClientBusinessModelsHook('test', {})

    const {
      result: { current }
    } = renderHook(() => useHook())

    expect(current.data).toStrictEqual([
      {
        text: 'B2B',
        value: 'B2B'
      }
    ])
  })
})

import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientBusinessModelsListDocument } from '../data'
import { getClientBusinessModelsListHook } from './get-client-business-models-list-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientBusinessModelsListHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientBusinessModelsListDocument, {})
      .mockImplementation(() => [
        () => ({}),
        {
          data: { clientBusinessModels: ['B2B'] },
          loading: false,
          called: false
        }
      ])

    const useHook = getClientBusinessModelsListHook({})

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

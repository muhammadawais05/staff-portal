import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientInterestedInDocument } from '../data'
import { systemInformationDataMock } from '../data/system-information-fragment.mock'
import { getClientInterestedInHook } from './get-client-interested-in-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('useGetClientInterestedIn', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientInterestedInDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: {
            node: { interestedIn: systemInformationDataMock.interestedIn }
          },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientInterestedInHook('test'))

    expect(current().data).toStrictEqual(systemInformationDataMock.interestedIn)
  })
})

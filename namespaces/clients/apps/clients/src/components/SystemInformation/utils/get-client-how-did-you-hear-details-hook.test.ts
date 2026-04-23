import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientHowDidYouHearDetailsDocument } from '../data'
import { systemInformationDataMock } from '../data/system-information-fragment.mock'
import { getClientHowDidYouHearDetailsHook } from './get-client-how-did-you-hear-details-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('useGetHowDidYouHearDetails', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientHowDidYouHearDetailsDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: {
            node: {
              howDidYouHearDetails:
                systemInformationDataMock.howDidYouHearDetails
            }
          },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientHowDidYouHearDetailsHook('test'))

    expect(current().data).toStrictEqual(
      systemInformationDataMock.howDidYouHearDetails
    )
  })
})

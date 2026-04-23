import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientHowDidYouHearDocument } from '../data'
import { systemInformationDataMock } from '../data/system-information-fragment.mock'
import { getClientHowDidYouHearHook } from './get-client-how-did-you-hear-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('useGetHowDidYouHear', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientHowDidYouHearDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: {
            node: { howDidYouHear: systemInformationDataMock.howDidYouHear }
          },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientHowDidYouHearHook('test'))

    expect(current().data).toStrictEqual(
      systemInformationDataMock.howDidYouHear
    )
  })
})

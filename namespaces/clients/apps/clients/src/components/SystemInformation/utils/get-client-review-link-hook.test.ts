import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientReviewLinkDocument } from '../data'
import { systemInformationDataMock } from '../data/system-information-fragment.mock'
import { getClientReviewLinkHook } from './get-client-review-link-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('useGetClientReviewLink', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientReviewLinkDocument, {
        variables: { clientId: 'test' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: {
            node: { reviewLink: systemInformationDataMock.reviewLink }
          },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getClientReviewLinkHook('test'))

    expect(current().data).toStrictEqual(systemInformationDataMock.reviewLink)
  })
})

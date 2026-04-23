import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientSocialMediaDocument } from '../data'
import socialMediaCompanyDetails from '../data/client-social-media-fragment.mock'
import { getClientSocialMediaHook } from './get-client-social-media-hook'

const CLIENT_ID = socialMediaCompanyDetails.id

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getClientSocialMediaHook', () => {
  it('returns field value', async () => {
    const mockRequest = jest.fn()

    when(mockUseLazyQuery)
      .calledWith(GetClientSocialMediaDocument, expect.anything())
      .mockImplementation(() => [
        mockRequest,
        {
          data: { node: socialMediaCompanyDetails },
          loading: false,
          called: true
        }
      ])

    const { result } = renderHook(() =>
      getClientSocialMediaHook(CLIENT_ID, 'twitter')
    )

    const fetchResult = result.current()

    expect(fetchResult).toEqual({
      request: mockRequest,
      loading: false,
      data: 'awesome',
      called: true
    })
  })
})

import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'

import getCommentsFeedsParameter from './get-comments-feeds-parameter'

jest.mock('@staff-portal/data-layer-service')

const decodeEntityIdMock = decodeEntityId as jest.Mock
const encodeGidMock = encodeGid as jest.Mock

const COMPANY_ID = 'company-id'

describe('getCommentsFeedsParameter', () => {
  it('returns expected result', () => {
    decodeEntityIdMock.mockReturnValue({ type: 'type', id: 'id' })
    encodeGidMock.mockReturnValue('encode-result')

    const feeds = getCommentsFeedsParameter(COMPANY_ID)

    expect(decodeEntityIdMock).toHaveBeenCalledTimes(1)
    expect(decodeEntityIdMock).toHaveBeenCalledWith(COMPANY_ID)

    expect(encodeGidMock).toHaveBeenCalledTimes(1)
    expect(encodeGidMock).toHaveBeenCalledWith('type', 'id')

    expect(feeds).toEqual([['encode-result'], ['client_screening']])
  })
})

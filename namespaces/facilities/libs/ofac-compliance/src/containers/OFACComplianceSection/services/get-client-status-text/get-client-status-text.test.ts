import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import { companyStatusTextMappingMock } from '../../../../mocks'
import { getClientStatusText } from './get-client-status-text'

describe('getClientStatusText', () => {
  it('returns status by key from provided object', () => {
    expect(
      getClientStatusText(
        ClientCumulativeStatus.REJECTED,
        companyStatusTextMappingMock
      )
    ).toBe('Deleted')
  })

  it('returns enum value in case object with mapping is not provided', () => {
    expect(
      getClientStatusText(ClientCumulativeStatus.REJECTED, undefined)
    ).toBe('REJECTED')
  })
})

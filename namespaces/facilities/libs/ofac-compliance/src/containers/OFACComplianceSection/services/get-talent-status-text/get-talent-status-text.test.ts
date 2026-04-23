import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { talentStatusMappingMock } from '../../../../mocks'
import { getTalentStatusText } from './get-talent-status-text'

describe('getTalentStatusText', () => {
  it('returns status by key from provided object', () => {
    expect(
      getTalentStatusText(
        TalentCumulativeStatus.ACTIVE,
        talentStatusMappingMock
      )
    ).toBe('Active')
  })

  it('returns enum value in case object with mapping is not provided', () => {
    expect(getTalentStatusText(TalentCumulativeStatus.ACTIVE, undefined)).toBe(
      'ACTIVE'
    )
  })
})

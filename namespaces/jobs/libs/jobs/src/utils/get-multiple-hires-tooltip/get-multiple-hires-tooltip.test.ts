import { JobStatus } from '@staff-portal/graphql/staff'

import {
  getMultipleHiresTooltip,
  MULTIPLE_HIRES_TOOLTIP
} from './get-multiple-hires-tooltip'

describe('getMultipleHiresTooltip', () => {
  it('returns a tooltip', () => {
    expect(
      getMultipleHiresTooltip({ talentCount: 2, status: JobStatus.ACTIVE })
    ).toEqual(MULTIPLE_HIRES_TOOLTIP)
  })

  it('returns undefined', () => {
    expect(
      getMultipleHiresTooltip({ talentCount: 1, status: JobStatus.ACTIVE })
    ).toBeUndefined()
    expect(
      getMultipleHiresTooltip({
        talentCount: 2,
        status: JobStatus.PENDING_CLAIM
      })
    ).toBeUndefined()
  })
})

import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import { getIsQuizSectionCollapsedByDefault } from './getIsQuizSectionCollapsedByDefault'

describe('when cumulative status is APPLIED, BAD_LEAD or SOURCED', () => {
  it('Quiz section is expanded by default', () => {
    const statuses = [
      ClientCumulativeStatus.APPLIED,
      ClientCumulativeStatus.BAD_LEAD,
      ClientCumulativeStatus.SOURCED
    ]

    statuses.forEach(cumulativeStatus => {
      expect(getIsQuizSectionCollapsedByDefault(cumulativeStatus)).toBe(
        false
      )
    })
  })
})

describe('when there is no cumulative status', () => {
  it('Quiz section is expanded by default', () => {
    expect(getIsQuizSectionCollapsedByDefault()).toBe(false)
  })
})

describe('when cumulative status is other than APPLIED, BAD_LEAD or SOURCED', () => {
  it('Quiz section is collapsed by default', () => {
    const statuses = [
      ClientCumulativeStatus.BLACK_FLAGGED,
      ClientCumulativeStatus.CONTACTED,
      ClientCumulativeStatus.HAD_JOB,
      ClientCumulativeStatus.HAS_ACTIVE_JOB,
      ClientCumulativeStatus.OVERDUE_INVOICES,
      ClientCumulativeStatus.PAUSED_ACTIVE,
      ClientCumulativeStatus.PENDING_BILLING_INFO,
      ClientCumulativeStatus.PENDING_TOS,
      ClientCumulativeStatus.PAUSED_APPLIED,
      ClientCumulativeStatus.REJECTED
    ]

    statuses.forEach(cumulativeStatus => {
      expect(getIsQuizSectionCollapsedByDefault(cumulativeStatus)).toBe(true)
    })
  })
})

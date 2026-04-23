import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { JobStatus as JobStatusType } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import JobStatus from './JobStatus'

const arrangeTest = (status: JobStatusType | undefined) => {
  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <JobStatus status={status} />
    </TestWrapper>
  )

  return innerHTML
}

const STATUS_TEXTS = [
  [JobStatusType.ACTIVE, 'Active', 'green'],
  [JobStatusType.CLOSED, 'Closed', 'black'],
  [JobStatusType.PENDING_CLAIM, 'Pending Claim', 'yellow'],
  [JobStatusType.PENDING_ENGINEER, 'Pending Talent', 'yellow'],
  [JobStatusType.POSTPONED, 'Postponed', 'red'],
  [JobStatusType.REJECTED, 'Rejected', 'red'],
  [JobStatusType.REMOVED, 'Deleted', 'black'],
  [JobStatusType.SENDING_AWAY, 'Sending Away', 'red'],
  [JobStatusType.DRAFTED_BY_SALES, "Waiting for Client's Review", 'black'],
  [JobStatusType.DRAFT_CONFIRMED, 'Reviewed by Client (TOS Accepted)', 'black'],
  [JobStatusType.DRAFT_PROJECTS, 'Draft', 'black'],
  [JobStatusType.DRAFT_UNCONFIRMED, 'Reviewed by Client', 'black']
]

describe('JobStatusType', () => {
  it('shows NO_VALUE when status is undefined', () => {
    const content = arrangeTest(undefined)

    expect(content).toContain(NO_VALUE)
  })

  it('does not show NO_VALUE when status is presented', () => {
    const content = arrangeTest(JobStatusType.ACTIVE)

    expect(content).not.toContain(NO_VALUE)
  })

  it.each(STATUS_TEXTS)(
    'has a correct status text %p',
    (status, statusText, color) => {
      const content = arrangeTest(status as JobStatusType)

      expect(content).toContain(statusText)
      expect(content).toContain(color)
    }
  )
})

import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { OpportunityStatus as OpportunityStatusType } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import { OpportunityStatus } from './OpportunityStatus'

const arrangeTest = (status: OpportunityStatusType | undefined) => {
  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <OpportunityStatus status={status} />
    </TestWrapper>
  )

  return innerHTML
}

const STATUS_TEXTS = [
  [OpportunityStatusType.IDENTIFIED, 'Identified', 'dark-grey'],

  [OpportunityStatusType.QUALIFYING, 'Qualifying', 'yellow'],
  [OpportunityStatusType.SOLUTIONING, 'Solutioning', 'yellow'],
  [OpportunityStatusType.CLOSING, 'Closing', 'yellow'],

  [OpportunityStatusType.CLOSED_WON, 'Closed Won', 'green'],
  [OpportunityStatusType.FULFILLMENT, 'Fulfillment', 'green'],
  [OpportunityStatusType.ENDED, 'Ended', 'green'],

  [OpportunityStatusType.CLOSED_LOST, 'Closed Lost', 'red'],
  [OpportunityStatusType.WITHDRAWN, 'Withdrawn', 'red'],

  [OpportunityStatusType.PLANNING, 'Planning', 'black'],
  [OpportunityStatusType.MAINTENANCE, 'Maintenance', 'black'],
  [OpportunityStatusType.IMPLEMENTATION, 'Implementation', 'black']
]

describe('OpportunityStatusType', () => {
  it('shows NO_VALUE when status is undefined', () => {
    const content = arrangeTest(undefined)

    expect(content).toContain(NO_VALUE)
  })

  it('does not show NO_VALUE when status is presented', () => {
    const content = arrangeTest(OpportunityStatusType.IDENTIFIED)

    expect(content).not.toContain(NO_VALUE)
  })

  it.each(STATUS_TEXTS)(
    'has a correct status text %p',
    (status, statusText, color) => {
      const content = arrangeTest(status as OpportunityStatusType)

      expect(content).toContain(statusText)
      expect(content).toContain(color)
    }
  )
})

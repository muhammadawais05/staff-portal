import { render, screen } from '@testing-library/react'
import { ColorType } from '@toptal/picasso'
import React from 'react'
import {
  EngagementStatus as EngagementStatusEnum,
  InterviewCumulativeStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { EngagementWithStatusAndTimeZone } from '../../types'
import EngagementStatus from '../EngagementStatus'

const TALENT_TYPE = 'Developer'

jest.mock('../../services', () => ({
  ...jest.requireActual('../../services'),
  getEngagementStatusTooltip: () => 'engagement-tooltip'
}))

jest.mock('../../utils/get-interview-status-color', () => ({
  getInterviewStatusColor: () => 'interview-color'
}))

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  getRoleTypeText: () => TALENT_TYPE
}))

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ColoredStatus: ({
    status,
    color,
    tooltipContent
  }: {
    status: string
    color?: string
    tooltipContent: string
  }) => (
    <div
      data-testid='engagement-status'
      data-color={color || 'grey'}
      data-tooltip={tooltipContent}
    >
      {status}
    </div>
  )
}))

const mockEngagement = (
  engagementData: Partial<EngagementWithStatusAndTimeZone> = {}
): EngagementWithStatusAndTimeZone => ({
  status: EngagementStatusEnum.ACTIVE,
  cumulativeStatus: EngagementCumulativeStatus.ACTIVE,
  ...engagementData
})

const arrangeTest = (
  engagementData: Partial<EngagementWithStatusAndTimeZone> = {},
  color?: ColorType
) =>
  render(
    <TestWrapper>
      <EngagementStatus.Default
        color={color}
        engagement={mockEngagement(engagementData)}
        talentType={TALENT_TYPE}
      />
    </TestWrapper>
  )

const RED_STATUSES = [
  EngagementCumulativeStatus.PENDING_EXPIRATION,
  EngagementCumulativeStatus.REJECTED_TRIAL,
  EngagementCumulativeStatus.REJECTED_INTERVIEW,
  EngagementCumulativeStatus.EXPIRED,
  EngagementCumulativeStatus.ON_HOLD,
  EngagementCumulativeStatus.REJECTED_DRAFT,
  EngagementCumulativeStatus.INTERVIEW_TIME_REJECTED,
  EngagementCumulativeStatus.INTERVIEW_MISSED,
  EngagementCumulativeStatus.INTERVIEW_REJECTED,
  EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED,
  EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED_VERIFIED_BY_STAFF
]

const YELLOW_STATUSES = [
  EngagementCumulativeStatus.DRAFT,
  EngagementCumulativeStatus.PENDING_APPROVAL,
  EngagementCumulativeStatus.PENDING,
  EngagementCumulativeStatus.END_SCHEDULED,
  EngagementCumulativeStatus.ON_BREAK,
  EngagementCumulativeStatus.EXPIRATION_POSTPONED,
  EngagementCumulativeStatus.PENDING_LEGAL,
  EngagementCumulativeStatus.INTERVIEW_SCHEDULED
]

const GREEN_STATUSES = [
  EngagementCumulativeStatus.ACTIVE,
  EngagementCumulativeStatus.ON_TRIAL,
  EngagementCumulativeStatus.SCHEDULED,
  EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED,
  EngagementCumulativeStatus.INTERVIEW_ACCEPTED,
  EngagementCumulativeStatus.INTERVIEW_OCCURRED,
  EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF
]

describe('Default Engagement Status', () => {
  it.each(RED_STATUSES)('red color for status %p', status => {
    arrangeTest({ cumulativeStatus: status })
    expect(screen.getByTestId('engagement-status')).toHaveAttribute(
      'data-color',
      'red'
    )
  })

  it.each(YELLOW_STATUSES)('yellow color for status %p', status => {
    arrangeTest({ cumulativeStatus: status })
    expect(screen.getByTestId('engagement-status')).toHaveAttribute(
      'data-color',
      'yellow'
    )
  })

  it.each(GREEN_STATUSES)('green color for status %p', status => {
    arrangeTest({ cumulativeStatus: status })
    expect(screen.getByTestId('engagement-status')).toHaveAttribute(
      'data-color',
      'green'
    )
  })

  Object.values(EngagementCumulativeStatus).forEach(cumulativeStatus => {
    it(`renders "${cumulativeStatus}" status with interview color if engagement is in REVIEW status`, () => {
      arrangeTest({
        status: EngagementStatusEnum.REVIEWED,
        cumulativeStatus,
        interview: {
          cumulativeStatus: InterviewCumulativeStatus.ACCEPTED
        }
      })
      expect(screen.getByTestId('engagement-status')).toHaveAttribute(
        'data-color',
        'interview-color'
      )
    })

    it(`renders "${cumulativeStatus}" status with engagement tooltip`, () => {
      arrangeTest({ cumulativeStatus })
      expect(screen.getByTestId('engagement-status')).toHaveAttribute(
        'data-tooltip',
        'engagement-tooltip'
      )
    })
  })

  it('renders with custom color', () => {
    arrangeTest(
      {
        cumulativeStatus: EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED
      },
      'inherit'
    )
    expect(screen.getByTestId('engagement-status')).toHaveAttribute(
      'data-color',
      'inherit'
    )
  })
})

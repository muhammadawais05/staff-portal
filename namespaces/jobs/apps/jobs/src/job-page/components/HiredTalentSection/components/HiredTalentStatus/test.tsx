import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  Interview,
  EngagementStatus,
  EngagementTooltipStatus,
  InterviewCumulativeStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'

import { HiredTalentEngagementFragment } from '../../data/get-hired-talent/get-hired-talent.staff.gql.types'
import { createHiredTalentEngagementFragmentMock } from '../../data/get-hired-talent/mocks'
import HiredTalentStatus from './HiredTalentStatus'

const ENGAGEMENT_STATUS_MESSAGE = 'Engagement Detailed Status Message'

jest.mock('@staff-portal/engagements-interviews', () => ({
  getEngagementStatusColor: () => 'red',
  getEngagementStatusTooltip: () => 'Mock Tooltip',
  getEngagementDetailedStatus: () => ENGAGEMENT_STATUS_MESSAGE
}))

const defaultProps = createHiredTalentEngagementFragmentMock({
  engagement: {
    id: encodeEntityId('3', 'Test'),
    status: EngagementStatus.ACTIVE,
    cumulativeStatus: 'Cumulative Status',
    interview: {
      id: encodeEntityId('1', 'Test'),
      cumulativeStatus: InterviewCumulativeStatus.ACCEPTED
    } as Interview,
    timeZone: {
      name: 'Time Zone Name',
      value: 'Time Zone Value'
    },
    tooltipStatus: EngagementTooltipStatus.TIMEZONE,
    engagementEndedFeedbackReason: {
      id: encodeEntityId('2', 'Test'),
      name: 'Ended Name'
    },
    postponedPerformedAction: {
      comment: 'Comment'
    }
  }
})

const arrangeTest = (engagement?: Partial<HiredTalentEngagementFragment>) => {
  const newProps: HiredTalentEngagementFragment = {
    ...defaultProps,
    ...engagement
  }

  return render(
    <TestWrapper>
      <HiredTalentStatus engagement={newProps} />
    </TestWrapper>
  )
}

describe('HiredTalentStatus', () => {
  it('does not render extra tooltip', () => {
    arrangeTest({
      tooltipStatus: undefined
    })

    expect(screen.getByText(ENGAGEMENT_STATUS_MESSAGE)).toBeInTheDocument()
    expect(
      screen.queryByTestId('HiredTalentStatus-additional-info')
    ).not.toBeInTheDocument()
  })

  it('renders extra tooltip', () => {
    arrangeTest()

    expect(screen.getByText(ENGAGEMENT_STATUS_MESSAGE)).toBeInTheDocument()
    expect(
      screen.queryByTestId('HiredTalentStatus-additional-info')
    ).toBeInTheDocument()
    assertOnTooltipText(
      screen.getByTestId('HiredTalentStatus-additional-info'),
      'Mock Tooltip'
    )
  })
})

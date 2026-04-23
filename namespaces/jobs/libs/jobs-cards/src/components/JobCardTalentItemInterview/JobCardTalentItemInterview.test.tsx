import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { Engagement } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import JobCardTalentItemInterview from './JobCardTalentItemInterview'

const ENGAGEMENT_STATUS_MESSAGE = 'Engagement Detailed Status Message'

jest.mock('@staff-portal/engagements', () => ({
  ...jest.requireActual('@staff-portal/engagements'),
  ENGAGEMENT_COMMITMENT_MAPPING: jest.requireActual('@staff-portal/engagements')
    .ENGAGEMENT_COMMITMENT_MAPPING,
  EngagementCumulativeStatus: jest.requireActual('@staff-portal/engagements')
    .EngagementCumulativeStatus
}))
jest.mock('@staff-portal/engagements-interviews', () => ({
  getEngagementDetailedStatus: () => ENGAGEMENT_STATUS_MESSAGE
}))

const arrangeTest = (engagement: Engagement) =>
  render(
    <TestWrapper>
      <JobCardTalentItemInterview engagement={engagement} />
    </TestWrapper>
  )

describe('JobCardTalentItemInterview', () => {
  describe('when job does not have a scheduled interview', () => {
    it('does not show engagement status', () => {
      const engagement = {
        cumulativeStatus: EngagementCumulativeStatus.ACTIVE
      } as Engagement

      const { queryByTestId } = arrangeTest(engagement)

      expect(queryByTestId('interview-scheduled-time')).not.toBeInTheDocument()
    })
  })

  describe('when job has scheduled interview', () => {
    it('shows engagement status for accepted interview time', () => {
      const engagement = {
        cumulativeStatus: EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED
      } as Engagement

      const { getByTestId, getByText } = arrangeTest(engagement)

      expect(getByTestId('interview-scheduled-time')).toBeInTheDocument()
      expect(getByText(ENGAGEMENT_STATUS_MESSAGE)).toBeInTheDocument()
    })

    it('does not show engagement status for not accepted interview time', () => {
      const engagement = {
        cumulativeStatus: EngagementCumulativeStatus.SCHEDULED
      } as Engagement

      const { queryByTestId } = arrangeTest(engagement)

      expect(queryByTestId('interview-scheduled-time')).not.toBeInTheDocument()
    })
  })
})

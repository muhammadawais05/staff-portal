import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { TalentCoachingEngagementFragment } from '../../../../data'
import ApplicationStatusField from './ApplicationStatusField'

const arrangeTest = (
  applicationStatus?: TalentCoachingEngagementFragment['applicationStatus']
) =>
  render(
    <TestWrapper>
      <ApplicationStatusField applicationStatus={applicationStatus} />
    </TestWrapper>
  )

describe('ApplicationStatusField', () => {
  it('renders plural labels', () => {
    const jAs = 12
    const aRs = 48
    const confirmedARs = 23
    const engagements = 9
    const interviews = 24
    const cancelledInterviews = 4
    const rejectedInterviews = 13
    const successfulInterviews = 7
    const days = 30

    arrangeTest({
      id: '123',
      totalJobApplicationCount: jAs,
      totalAvailabilityRequestCount: aRs,
      confirmedAvailabilityRequestCount: confirmedARs,
      totalEngagementCount: engagements,
      totalInterviewCount: interviews,
      cancelledInterviewCount: cancelledInterviews,
      rejectedInterviewCount: rejectedInterviews,
      successfulInterviewCount: successfulInterviews,
      statusRetentionDays: days
    })

    expect(
      screen.getByText(
        `${jAs} JAs + ${aRs} ARs (${confirmedARs} confirmed) → ${engagements} engagements → ${interviews} interviews`
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        `${cancelledInterviews} canceled interviews, ${rejectedInterviews} rejected interviews, ${successfulInterviews} successful interviews`
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        `Succesful/Total Interviews: ${successfulInterviews}/${interviews}`
      )
    ).toBeInTheDocument()
    expect(screen.getByText(`Last ${days} days`)).toBeInTheDocument()
  })

  it('renders singular labels', () => {
    arrangeTest({
      id: '123',
      totalJobApplicationCount: 1,
      totalAvailabilityRequestCount: 1,
      confirmedAvailabilityRequestCount: 1,
      totalEngagementCount: 1,
      totalInterviewCount: 1,
      cancelledInterviewCount: 1,
      rejectedInterviewCount: 1,
      successfulInterviewCount: 1,
      statusRetentionDays: 1
    })

    expect(
      screen.getByText('1 JA + 1 AR (1 confirmed) → 1 engagement → 1 interview')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        '1 canceled interview, 1 rejected interview, 1 successful interview'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText('Succesful/Total Interviews: 1/1')
    ).toBeInTheDocument()
    expect(screen.getByText('Last 1 day')).toBeInTheDocument()
  })
})

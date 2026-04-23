import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  EngagementStatus,
  TalentCurrentInterviewsInterviewStatus
} from '@staff-portal/graphql/staff'

import CurrentInterviewsEntryCounts, {
  Props
} from './CurrentInterviewsEntryCounts'

const defaultProps: Props = {
  talentType: 'TalentType',
  currentInterviewsEntry: []
}

const arrangeTest = ({ talentType, currentInterviewsEntry } = defaultProps) =>
  render(
    <TestWrapper>
      <CurrentInterviewsEntryCounts
        talentType={talentType}
        currentInterviewsEntry={currentInterviewsEntry}
      />
    </TestWrapper>
  )

describe('CurrentInterviewsEntryCounts', () => {
  it('renders the component', () => {
    arrangeTest()

    expect(
      screen.getByTestId('current-interviews-entry-counts')
    ).toHaveTextContent('N/A')
  })

  it('renders the statutes text mapping ordered', () => {
    arrangeTest({
      ...defaultProps,
      currentInterviewsEntry: [
        {
          count: 4,
          engagementStatus: EngagementStatus.EXPIRATION_POSTPONED
        },
        {
          count: 1,
          engagementStatus: EngagementStatus.PENDING
        },
        {
          count: 3,
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.ACCEPTED
        },
        {
          count: 2,
          engagementStatus: EngagementStatus.REVIEWED,
          interviewStatus: TalentCurrentInterviewsInterviewStatus.SCHEDULED
        }
      ]
    })

    expect(
      screen.queryAllByTestId('current-interviews-entry-counts')[0]
    ).toHaveTextContent('Pending Review: 1')

    expect(
      screen.queryAllByTestId('current-interviews-entry-counts')[1]
    ).toHaveTextContent('Waiting for Confirmation: 2')

    expect(
      screen.queryAllByTestId('current-interviews-entry-counts')[2]
    ).toHaveTextContent('Talent Type Accepted: 3')

    expect(
      screen.queryAllByTestId('current-interviews-entry-counts')[3]
    ).toHaveTextContent('Expiration Postponed: 4')
  })
})

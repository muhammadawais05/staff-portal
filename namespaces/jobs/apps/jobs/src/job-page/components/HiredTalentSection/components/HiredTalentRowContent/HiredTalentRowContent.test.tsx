import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { HiredTalentEngagementFragment } from '../../data/get-hired-talent/get-hired-talent.staff.gql.types'
import HiredTalentRowContent from './HiredTalentRowContent'

jest.mock('../HiredTalentRowContentTalentDetails', () => ({
  __esModule: true,
  default: () => <div data-testid='HiredTalentRowContentTalentDetails' />
}))

jest.mock('../JobFeedbacks', () => ({
  __esModule: true,
  default: () => <div data-testid='JobFeedbacks' />
}))

jest.mock('../EngagementSurveyAnswers', () => ({
  __esModule: true,
  default: () => <div data-testid='EngagementSurveyAnswers' />
}))

jest.mock('../JobCommissions', () => ({
  __esModule: true,
  default: () => <div data-testid='JobCommissions' />
}))

jest.mock('../JobContracts', () => ({
  __esModule: true,
  default: () => <div data-testid='JobContracts' />
}))

jest.mock('../EngagementPausedFeedbacks', () => ({
  __esModule: true,
  default: () => <div data-testid='EngagementPausedFeedbacks' />
}))

jest.mock('@staff-portal/engagements', () => ({
  EngagementBreaks: () => <div data-testid='EngagementBreaks' />,
  EngagementFeedbacks: () => <div data-testid='EngagementFeedbacks' />
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <HiredTalentRowContent
        jobId='1'
        engagement={{} as HiredTalentEngagementFragment}
      />
    </TestWrapper>
  )

describe('HiredTalentRowContent', () => {
  it('shows hired talent sections', () => {
    arrangeTest()

    expect(
      screen.getByTestId('HiredTalentRowContentTalentDetails')
    ).toBeInTheDocument()
    expect(screen.getByTestId('JobFeedbacks')).toBeInTheDocument()
    expect(screen.getByTestId('EngagementSurveyAnswers')).toBeInTheDocument()
    expect(screen.getByTestId('JobCommissions')).toBeInTheDocument()
    expect(screen.getByTestId('JobContracts')).toBeInTheDocument()
    expect(screen.getByTestId('EngagementBreaks')).toBeInTheDocument()
    expect(screen.getByTestId('EngagementFeedbacks')).toBeInTheDocument()
    expect(screen.getByTestId('EngagementPausedFeedbacks')).toBeInTheDocument()
  })
})

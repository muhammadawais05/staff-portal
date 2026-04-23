import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetEngagementInterviews } from './data'
import EngagementInterviews from './EngagementInterviews'

jest.mock('@staff-portal/engagements-interviews', () => ({
  ...jest.requireActual('@staff-portal/engagements-interviews'),
  ScheduleInterviewItem: () => <div data-testid='schedule-interview-item' />
}))
jest.mock('./data')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('./components', () => ({
  EngagementInterview: () => <tr data-testid='interview' />,
  EngagementInterviewsLoader: () => <div data-testid='loader' />
}))

const mockReturnValues = ({
  initialLoading = false,
  hasEngagement = false,
  hasInterviews = false
}: Partial<{
  initialLoading?: boolean
  hasEngagement?: boolean
  hasInterviews?: boolean
}> = {}) => {
  const mockUseGetEngagementInterviews = useGetEngagementInterviews as jest.Mock

  mockUseGetEngagementInterviews.mockImplementation(() => ({
    engagement: hasEngagement
      ? {
          newExternalInterview: {
            operations: { proposeInterviewTimeSlots: {} }
          }
        }
      : undefined,
    interviews: hasInterviews ? [{ id: 'abc' }] : undefined,
    initialLoading,
    loading: false
  }))
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EngagementInterviews engagementId='123' />
    </TestWrapper>
  )

describe('EngagementInterviews', () => {
  it('returns null if there are no interviews', () => {
    mockReturnValues()
    arrangeTest()

    expect(
      screen.queryByTestId('engagement-interviews-section')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('ContainerLoader-showSkeleton')
    ).toHaveTextContent('false')
  })

  it('shows the skeleton loader', () => {
    mockReturnValues({ initialLoading: true })
    arrangeTest()

    expect(
      screen.queryByTestId('engagement-interviews-section')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('ContainerLoader-showSkeleton')
    ).toHaveTextContent('true')
  })

  it('shows engagement interviews', () => {
    mockReturnValues({
      initialLoading: false,
      hasEngagement: true,
      hasInterviews: true
    })
    arrangeTest()

    expect(screen.getByTestId('schedule-interview-item')).toBeInTheDocument()
    expect(
      screen.getByTestId('engagement-interviews-section')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('ContainerLoader-showSkeleton')
    ).toHaveTextContent('false')
  })
})

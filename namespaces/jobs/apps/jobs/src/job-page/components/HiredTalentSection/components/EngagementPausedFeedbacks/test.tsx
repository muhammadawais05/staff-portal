import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { FeedbackDetailsFragment } from '@staff-portal/feedbacks'

import EngagementPausedFeedbacks from './EngagementPausedFeedbacks'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('@staff-portal/feedbacks', () => ({
  Feedback: () => <div data-testid='feedback' />
}))

const mockReturnValues = ({
  initialLoading = false,
  feedbacks
}: Partial<{
  initialLoading?: boolean
  feedbacks?: Partial<FeedbackDetailsFragment>[]
}> = {}) => {
  const mockUseGetNode = useGetNode as jest.Mock

  mockUseGetNode.mockImplementation(() => () => ({
    data: {
      feedbacks: { nodes: feedbacks }
    },
    initialLoading
  }))
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EngagementPausedFeedbacks labelColumnWidth={10} engagementId='123' />
    </TestWrapper>
  )

describe('EngagementFeedbacks', () => {
  describe('when no feedbacks are available', () => {
    it('returns null', () => {
      mockReturnValues()
      arrangeTest()

      expect(screen.queryByTestId('feedback')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('false')
    })
  })

  describe('when the section is loading', () => {
    it('shows the skeleton loader', () => {
      mockReturnValues({ initialLoading: true })
      arrangeTest()

      expect(screen.queryByTestId('feedback')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('true')
    })
  })

  it('shows engagement feedbacks', () => {
    mockReturnValues({ initialLoading: false, feedbacks: [{ id: '1' }] })
    arrangeTest()

    expect(screen.queryByTestId('feedback')).toBeInTheDocument()
    expect(
      screen.queryByTestId('ContainerLoader-showSkeleton')
    ).toHaveTextContent('false')
  })
})

import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { JobStatus } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { FeedbackDetailsFragment } from '@staff-portal/feedbacks'

import JobFeedbacksSection from './JobFeedbacksSection'

jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('@staff-portal/feedbacks', () => ({
  Feedback: () => <div data-testid='feedback' />
}))

const mockReturnValues = ({
  initialLoading = false,
  status = JobStatus.REMOVED,
  feedbacks
}: Partial<{
  initialLoading?: boolean
  status: JobStatus
  feedbacks?: Partial<FeedbackDetailsFragment>[]
}> = {}) => {
  const mockUseGetNode = useGetNode as jest.Mock

  mockUseGetNode.mockImplementation(() => () => ({
    data: {
      status,
      feedbacks: { nodes: feedbacks }
    },
    initialLoading
  }))
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobFeedbacksSection jobId='123' />
    </TestWrapper>
  )

describe('JobFeedbacksSection', () => {
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

  describe('when feedbacks are available', () => {
    it('shows job cancelled feedback', () => {
      mockReturnValues({ initialLoading: false, feedbacks: [{ id: '1' }] })
      arrangeTest()

      expect(screen.queryByTestId('feedback')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ContainerLoader-showSkeleton')
      ).toHaveTextContent('false')
    })
  })
})

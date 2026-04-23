import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import ParallelInterviewsSection from './ParallelInterviewsSection'
import { useCandidateSendingContext } from '../../hooks'
import { ParallelEngagementsFragment } from '../../data/get-availability-step-data'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  parallelEngagements,
  parallelEngagementsLoading
}: {
  parallelEngagements: ParallelEngagementsFragment[]
  parallelEngagementsLoading: boolean
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    stepsAttributes: {}
  }))

  render(
    <TestWrapper>
      <ParallelInterviewsSection
        parallelEngagements={parallelEngagements}
        parallelEngagementsLoading={parallelEngagementsLoading}
      />
    </TestWrapper>
  )
}

const parallelEngagementsMock = [
  {
    id: '123',
    commitment: EngagementCommitmentEnum.FULL_TIME
  }
]

describe('ParallelInterviewsSection', () => {
  describe('when data is loading', () => {
    it('renders the skeleton loader', () => {
      renderComponent({
        parallelEngagements: parallelEngagementsMock,
        parallelEngagementsLoading: true
      })

      expect(
        screen.getByTestId('parallel-interviews-section-skeleton-loader')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('parallel-interviews-section')
      ).not.toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('renders the parallel interviews section', () => {
      renderComponent({
        parallelEngagements: parallelEngagementsMock,
        parallelEngagementsLoading: false
      })

      expect(
        screen.queryByTestId('parallel-interviews-section-skeleton-loader')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('parallel-interviews-section')
      ).toBeInTheDocument()
    })
  })
})

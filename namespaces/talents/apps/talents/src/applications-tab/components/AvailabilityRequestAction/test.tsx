import React from 'react'
import { render, screen } from '@testing-library/react'
import { AvailabilityRequestCandidateStatus as CandidateStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AvailabilityRequestAction, { Props } from './AvailabilityRequestAction'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <AvailabilityRequestAction {...props} />
    </TestWrapper>
  )

describe('AvailabilityRequestAction', () => {
  it('renders appropriate label for CANDIDATE_SENT status', () => {
    arrangeTest({
      candidateStatus: CandidateStatus.CANDIDATE_SENT
    })

    expect(screen.getByText('Candidate Sent')).toBeInTheDocument()
    expect(screen.queryByText('Draft Created')).not.toBeInTheDocument()
  })

  it('renders appropriate label for DRAFT_CREATED status', () => {
    arrangeTest({
      candidateStatus: CandidateStatus.DRAFT_CREATED
    })

    expect(screen.queryByText('Candidate Sent')).not.toBeInTheDocument()
    expect(screen.getByText('Draft Created')).toBeInTheDocument()
  })

  it('renders appropriate label for INTERVIEW_CANCELED status', () => {
    arrangeTest({
      candidateStatus: CandidateStatus.INTERVIEW_CANCELED
    })

    expect(screen.queryByText('Candidate Sent')).not.toBeInTheDocument()
    expect(screen.getByText('Interview Canceled')).toBeInTheDocument()
  })

  it('renders Send Candidate button', () => {
    arrangeTest({
      candidateStatus: CandidateStatus.AVAILABLE_FOR_SEND,
      sendCandidateUrl: 'https://test.url'
    })

    expect(screen.queryByText('Candidate Sent')).not.toBeInTheDocument()
    expect(screen.queryByText('Draft Created')).not.toBeInTheDocument()
    expect(screen.getByText('Send Candidate')).toBeInTheDocument()
  })
})

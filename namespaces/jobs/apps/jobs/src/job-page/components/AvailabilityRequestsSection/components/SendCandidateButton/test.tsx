import React from 'react'
import { render, screen } from '@testing-library/react'
import { AvailabilityRequestCandidateStatus } from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import SendCandidateButton, { Props } from './SendCandidateButton'

const SEND_CANDIDATE_LINK_PATH = 'https://staging.toptal.net/platform/staff'

const SUSPENDED_TALENT_TOOLTIP_CONTENT =
  'You cannot send suspended talent to a job'

const arrangeTest = (mocks: Props) => {
  render(
    <TestWrapper>
      <SendCandidateButton {...mocks} />
    </TestWrapper>
  )
}

describe('SendCandidateButton', () => {
  it('renders send candidate button', () => {
    arrangeTest({
      candidateStatus: AvailabilityRequestCandidateStatus.AVAILABLE_FOR_SEND,
      jobType: 'developer',
      sendCandidateUrl: SEND_CANDIDATE_LINK_PATH,
      talentSuspended: false
    })

    const sendCandidateLink = screen.getByTestId('send-candidate-link')

    expect(sendCandidateLink).toBeInTheDocument()
    expect(sendCandidateLink).toHaveAttribute('href', SEND_CANDIDATE_LINK_PATH)
  })

  it('renders disabled send candidate button with tooltip', () => {
    arrangeTest({
      candidateStatus:
        AvailabilityRequestCandidateStatus.NOT_AVAILABLE_FOR_SEND,
      jobType: 'developer',
      sendCandidateUrl: SEND_CANDIDATE_LINK_PATH,
      talentSuspended: true
    })

    const sendCandidateLink = screen.getByTestId('send-candidate-link')

    assertOnTooltipText(sendCandidateLink, SUSPENDED_TALENT_TOOLTIP_CONTENT)
  })

  it('renders interview canceled tag', () => {
    arrangeTest({
      candidateStatus: AvailabilityRequestCandidateStatus.INTERVIEW_CANCELED,
      jobType: 'developer',
      sendCandidateUrl: SEND_CANDIDATE_LINK_PATH,
      talentSuspended: false
    })

    const interviewCanceledTag = screen.getByTestId('interview-canceled-tag')

    expect(interviewCanceledTag).toBeInTheDocument()
    expect(interviewCanceledTag).toHaveTextContent(/interview canceled/i)
  })

  it('renders draft created tag', () => {
    arrangeTest({
      candidateStatus: AvailabilityRequestCandidateStatus.DRAFT_CREATED,
      jobType: 'developer',
      sendCandidateUrl: SEND_CANDIDATE_LINK_PATH,
      talentSuspended: false
    })

    const draftCreatedTag = screen.getByTestId('draft-created-tag')

    expect(draftCreatedTag).toBeInTheDocument()
    expect(draftCreatedTag).toHaveTextContent(/draft created/i)
  })

  it('renders candidate sent tag', () => {
    arrangeTest({
      candidateStatus: AvailabilityRequestCandidateStatus.CANDIDATE_SENT,
      jobType: 'developer',
      sendCandidateUrl: SEND_CANDIDATE_LINK_PATH,
      talentSuspended: false
    })

    const candidateSentTag = screen.getByTestId('candidate-sent-tag')

    expect(candidateSentTag).toBeInTheDocument()
    expect(candidateSentTag).toHaveTextContent(/candidate sent/i)
  })
})

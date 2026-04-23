import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobDetailsTab } from './JobDetailsTab'

jest.mock('../../components', () => ({
  CommitmentChangeRequestSection: () => (
    <div data-testid='CommitmentChangeRequestSection' />
  ),
  JobDetailsSection: () => <div data-testid='JobDetailsSection' />,
  HiredTalentSection: () => <div data-testid='HiredTalentSection' />,
  JobApplicantsSection: () => <div data-testid='JobApplicantsSection' />,
  AvailabilityRequestsSection: () => (
    <div data-testid='AvailabilityRequestsSection' />
  ),
  JobRelatedTasksSection: () => <div data-testid='JobRelatedTasksSection' />,
  JobCandidateIntroDrafts: () => <div data-testid='JobCandidateIntroDrafts' />,
  NotesSection: () => <div data-testid='NotesSection' />,
  CancelledJobApplicantsSection: () => (
    <div data-testid='CancelledJobApplicantsSection' />
  ),
  JobCandidatesSection: () => <div data-testid='JobCandidatesSection' />,
  JobFeedbacksSection: () => <div data-testid='JobFeedbacksSection' />
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobDetailsTab jobId='test-job-id' />
    </TestWrapper>
  )

describe('JobDetailsTab', () => {
  it('renders sections', () => {
    arrangeTest()

    expect(
      screen.getByTestId('CommitmentChangeRequestSection')
    ).toBeInTheDocument()
    expect(screen.getByTestId('JobDetailsSection')).toBeInTheDocument()
    expect(screen.getByTestId('HiredTalentSection')).toBeInTheDocument()
    expect(screen.getByTestId('JobApplicantsSection')).toBeInTheDocument()
    expect(
      screen.getByTestId('AvailabilityRequestsSection')
    ).toBeInTheDocument()
    expect(screen.getByTestId('JobRelatedTasksSection')).toBeInTheDocument()
    expect(screen.getByTestId('JobCandidateIntroDrafts')).toBeInTheDocument()
    expect(screen.getByTestId('NotesSection')).toBeInTheDocument()
    expect(
      screen.getByTestId('CancelledJobApplicantsSection')
    ).toBeInTheDocument()
    expect(screen.getByTestId('JobCandidatesSection')).toBeInTheDocument()
    expect(screen.getByTestId('JobFeedbacksSection')).toBeInTheDocument()
  })
})

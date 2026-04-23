import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import {
  CommitmentChangeRequestSection,
  JobDetailsSection,
  HiredTalentSection,
  JobApplicantsSection,
  AvailabilityRequestsSection,
  JobRelatedTasksSection,
  JobCandidateIntroDrafts,
  JobFeedbacksSection,
  NotesSection,
  CancelledJobApplicantsSection,
  JobCandidatesSection
} from '../../components'

interface Props {
  jobId: string
}

export const JobDetailsTab = ({ jobId }: Props) => (
  <>
    <WidgetErrorBoundary>
      <JobDetailsSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <HiredTalentSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <CommitmentChangeRequestSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobCandidatesSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobCandidateIntroDrafts jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobApplicantsSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <CancelledJobApplicantsSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <AvailabilityRequestsSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobFeedbacksSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobRelatedTasksSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <NotesSection jobId={jobId} />
    </WidgetErrorBoundary>
  </>
)

export default JobDetailsTab

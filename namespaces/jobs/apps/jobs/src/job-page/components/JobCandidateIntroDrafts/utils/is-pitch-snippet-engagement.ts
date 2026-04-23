import { EngagementStatus } from '@staff-portal/graphql/staff'

import { JobCandidateIntroDraftsEngagementFragment } from '../data/get-candidate-intro-drafts'

export const isPitchSnippetEngagement = (
  engagement: JobCandidateIntroDraftsEngagementFragment
): boolean => {
  return (
    !!engagement.status &&
    [
      EngagementStatus.DRAFT,
      EngagementStatus.PENDING_APPROVAL,
      EngagementStatus.READY_TO_SEND
    ].includes(engagement.status)
  )
}

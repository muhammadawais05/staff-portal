import { gql } from '@staff-portal/data-layer-service'

export const JOB_CANDIDATE_OPERATIONS_FRAGMENT = gql`
  fragment JobCandidateOperationsFragment on TalentOperations {
    addTalentToJobFavorites(jobId: $jobId) {
      callable
      messages
    }
    removeTalentFromJobFavorites(jobId: $jobId) {
      callable
      messages
    }
  }
`

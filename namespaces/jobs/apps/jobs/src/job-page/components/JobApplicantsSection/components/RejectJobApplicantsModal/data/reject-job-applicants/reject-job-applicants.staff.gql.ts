import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const REJECT_JOB_APPLICANTS = gql`
  mutation RejectJobApplicants(
    $ids: [ID!]!
    $comment: String!
    $reason: JobApplicationRejectReason!
  ) {
    rejectJobApplicants(
      input: { jobApplicationIds: $ids, comment: $comment, reason: $reason }
    ) {
      ...MutationResultFragment
      notice
      successCount
      failureCount
      failureMessage
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

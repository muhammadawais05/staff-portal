import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const REJECT_JOB_APPLICANT = gql`
  mutation RejectJobApplicant(
    $jobApplicationId: ID!
    $comment: String!
    $reason: JobApplicationRejectReason!
  ) {
    rejectJobApplicant(
      input: {
        jobApplicationId: $jobApplicationId
        comment: $comment
        reason: $reason
      }
    ) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const APPROVE_REJECTED_TRIAL_ENGAGEMENT = gql`
  mutation ApproveRejectedEngagementTrial(
    $input: ApproveRejectedEngagementTrialInput!
  ) {
    approveRejectedEngagementTrial(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

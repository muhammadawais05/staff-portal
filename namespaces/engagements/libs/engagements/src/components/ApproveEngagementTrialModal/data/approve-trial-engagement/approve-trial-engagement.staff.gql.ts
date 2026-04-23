import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const APPROVE_TRIAL_ENGAGEMENT = gql`
  mutation ApproveEngagementTrial($input: ApproveEngagementTrialInput!) {
    approveEngagementTrial(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

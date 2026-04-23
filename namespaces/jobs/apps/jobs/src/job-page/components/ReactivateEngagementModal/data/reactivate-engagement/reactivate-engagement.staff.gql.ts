import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const REACTIVATE_ENGAGEMENT = gql`
  mutation ReactivateEngagement($input: ReactivateEngagementInput!) {
    reactivateEngagement(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

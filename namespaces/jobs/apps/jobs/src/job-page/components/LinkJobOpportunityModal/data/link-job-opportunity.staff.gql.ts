import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const LINK_JOB_OPPORTUNITY = gql`
  mutation LinkJobOpportunity($input: LinkJobOpportunityInput!) {
    linkJobOpportunity(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

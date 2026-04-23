import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UNLINK_JOB_OPPORTUNITY = gql`
  mutation UnlinkJobOpportunity($input: UnlinkJobOpportunityInput!) {
    unlinkJobOpportunity(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

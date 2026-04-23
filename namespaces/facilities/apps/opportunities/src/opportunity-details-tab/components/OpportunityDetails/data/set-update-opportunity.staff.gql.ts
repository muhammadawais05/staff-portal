import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { OPPORTUNITY_DETAILS_FRAGMENT } from './opportunity-details-fragment.staff.gql'

export default gql`
  mutation SetUpdateOpportunity($input: UpdateOpportunityInput!) {
    updateOpportunity(input: $input) {
      opportunity {
        ...OpportunityDetailsFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${OPPORTUNITY_DETAILS_FRAGMENT}
`

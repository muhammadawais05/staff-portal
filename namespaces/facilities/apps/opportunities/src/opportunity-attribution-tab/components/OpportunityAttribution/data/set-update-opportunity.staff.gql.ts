import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { OPPORTUNITY_ATTRIBUTION_FRAGMENT } from './opportunity-attribution-fragment.staff.gql'

export default gql`
  mutation SetUpdateOpportunity($input: UpdateOpportunityInput!) {
    updateOpportunity(input: $input) {
      opportunity {
        ...OpportunityAttributionFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${OPPORTUNITY_ATTRIBUTION_FRAGMENT}
`

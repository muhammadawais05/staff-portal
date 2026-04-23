import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetOpportunityRelationshipManager(
    $input: UpdateOpportunityRelationshipManagerInput!
  ) {
    updateOpportunityRelationshipManager(input: $input) {
      opportunity {
        id
        relationshipManager {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetOpportunityProjectRelationshipManager(
    $input: UpdateOpportunityProjectRelationshipManagerInput!
  ) {
    updateOpportunityProjectRelationshipManager(input: $input) {
      opportunity {
        id
        projectRelationshipManager {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

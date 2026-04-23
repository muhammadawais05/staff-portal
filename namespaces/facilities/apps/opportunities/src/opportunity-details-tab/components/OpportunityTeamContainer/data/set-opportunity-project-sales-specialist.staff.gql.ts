import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetOpportunityProjectSalesSpecialist(
    $input: UpdateOpportunityProjectSalesSpecialistInput!
  ) {
    updateOpportunityProjectSalesSpecialist(input: $input) {
      opportunity {
        id
        projectSalesSpecialist {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetClientProjectSalesSpecialist(
    $input: UpdateProjectSalesSpecialistInput!
  ) {
    updateProjectSalesSpecialist(input: $input) {
      client {
        id
        projectSalesSpecialist {
          id
          fullName
        }
      }
      ...MutationResultFragment
    }
  }
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

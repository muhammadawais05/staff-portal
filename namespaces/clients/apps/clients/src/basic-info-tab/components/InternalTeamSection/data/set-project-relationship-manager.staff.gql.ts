import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation SetProjectRelationshipManager(
    $input: UpdateProjectRelationshipManagerInput!
  ) {
    updateProjectRelationshipManager(input: $input) {
      client {
        id
        projectRelationshipManager {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
`

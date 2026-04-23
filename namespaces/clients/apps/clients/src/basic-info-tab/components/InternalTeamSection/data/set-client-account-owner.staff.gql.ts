import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation SetClientAccountOwner($input: UpdateClientAccountOwnerInput!) {
    updateClientAccountOwner(input: $input) {
      client {
        id
        accountOwner {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
`

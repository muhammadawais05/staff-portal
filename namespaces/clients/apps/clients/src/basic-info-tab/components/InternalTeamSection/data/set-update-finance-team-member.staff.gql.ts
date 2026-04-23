import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation SetUpdateFinanceTeamMember(
    $input: UpdateClientFinanceTeamMemberInput!
  ) {
    updateClientFinanceTeamMember(input: $input) {
      client {
        id
        financeTeamMember {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${STAFF_USER_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

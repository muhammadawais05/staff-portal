import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientEnterpriseLeadStatus(
    $input: UpdateClientEnterpriseLeadStatusInput!
  ) {
    updateClientEnterpriseLeadStatus(input: $input) {
      client {
        id
        enterpriseLeadStatus
        enterpriseFollowUpStatus
        enterpriseFollowUpStatusComment
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

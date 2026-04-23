import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientLeadSource($input: UpdateClientLeadSourceInput!) {
    updateClientLeadSource(input: $input) {
      client {
        id
        leadSource
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

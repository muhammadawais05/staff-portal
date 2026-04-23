import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientBusinessType($input: UpdateClientBusinessTypeInput!) {
    updateClientBusinessType(input: $input) {
      client {
        id
        businessTypeV2
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

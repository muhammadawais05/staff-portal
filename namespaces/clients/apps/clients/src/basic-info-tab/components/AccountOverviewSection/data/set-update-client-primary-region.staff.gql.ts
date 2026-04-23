import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientPrimaryRegion(
    $input: UpdateClientPrimaryRegionInput!
  ) {
    updateClientPrimaryRegion(input: $input) {
      client {
        id
        primaryRegion {
          id
          name
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientSecondaryRegion(
    $input: UpdateClientSecondaryRegionInput!
  ) {
    updateClientSecondaryRegion(input: $input) {
      client {
        id
        secondaryRegion {
          id
          name
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientFullName($input: PatchClientProfileInput!) {
    patchClientProfile(input: $input) {
      client {
        id
        fullName
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

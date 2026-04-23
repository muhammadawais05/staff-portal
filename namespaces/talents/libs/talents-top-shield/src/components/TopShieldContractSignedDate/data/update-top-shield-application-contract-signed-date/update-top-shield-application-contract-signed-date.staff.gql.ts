import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_CONTRACT_SIGNED_DATE = gql`
  mutation UpdateTopShieldApplicationContractSignedDate(
    $input: UpdateTopShieldApplicationContractSignedDateInput!
  ) {
    updateTopShieldApplicationContractSignedDate(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        contractSignedDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_QUARTER = gql`
  mutation UpdateTopShieldApplicationQuarter(
    $input: UpdateTopShieldApplicationQuarterInput!
  ) {
    updateTopShieldApplicationQuarter(input: $input) {
      ...MutationResultFragment
      quarter {
        id
        startDate
        endDate
        paymentEndDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

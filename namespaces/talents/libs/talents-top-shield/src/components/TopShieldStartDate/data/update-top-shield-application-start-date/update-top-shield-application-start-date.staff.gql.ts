import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_START_DATE = gql`
  mutation UpdateTopShieldApplicationStartDate(
    $input: UpdateTopShieldApplicationStartDateInput!
  ) {
    updateTopShieldApplicationStartDate(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        startDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

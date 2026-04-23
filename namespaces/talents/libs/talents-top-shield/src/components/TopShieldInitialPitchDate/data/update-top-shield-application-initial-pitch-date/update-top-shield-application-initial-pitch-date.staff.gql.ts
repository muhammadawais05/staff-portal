import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_INITIAL_PITCH_DATE = gql`
  mutation UpdateTopShieldApplicationInitialPitchDate(
    $input: UpdateTopShieldApplicationInitialPitchDateInput!
  ) {
    updateTopShieldApplicationInitialPitchDate(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        initialPitchDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

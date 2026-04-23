import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const ADD_GENERAL_TOP_SHIELD_NOTE = gql`
  mutation AddGeneralTopShieldApplicationNote(
    $input: AddGeneralTopShieldApplicationNoteInput!
  ) {
    addGeneralTopShieldApplicationNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

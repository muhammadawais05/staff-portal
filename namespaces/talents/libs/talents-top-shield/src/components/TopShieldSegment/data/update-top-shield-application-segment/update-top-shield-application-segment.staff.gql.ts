import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_SEGMENT = gql`
  mutation UpdateTopShieldApplicationSegment(
    $input: UpdateTopShieldApplicationSegmentInput!
  ) {
    updateTopShieldApplicationSegment(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        segment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

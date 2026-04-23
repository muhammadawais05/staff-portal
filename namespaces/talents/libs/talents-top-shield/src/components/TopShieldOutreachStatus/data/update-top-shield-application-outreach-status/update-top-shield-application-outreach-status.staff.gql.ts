import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_OUTREACH_STATUS = gql`
  mutation UpdateTopShieldApplicationOutreachStatus(
    $input: UpdateTopShieldApplicationOutreachStatusInput!
  ) {
    updateTopShieldApplicationOutreachStatus(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        outreachStatus
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

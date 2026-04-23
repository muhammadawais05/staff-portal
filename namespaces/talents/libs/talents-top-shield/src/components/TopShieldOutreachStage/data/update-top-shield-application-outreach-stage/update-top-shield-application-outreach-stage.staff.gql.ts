import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_OUTREACH_STAGE = gql`
  mutation UpdateTopShieldApplicationOutreachStage(
    $input: UpdateTopShieldApplicationOutreachStageInput!
  ) {
    updateTopShieldApplicationOutreachStage(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        outreachStage
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

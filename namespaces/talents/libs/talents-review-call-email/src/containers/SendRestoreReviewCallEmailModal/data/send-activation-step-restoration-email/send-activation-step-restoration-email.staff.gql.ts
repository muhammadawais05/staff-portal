import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { ACTIVATION_STEP_FRAGMENT } from '@staff-portal/talents'

export default gql`
  mutation SendActivationStepRestorationEmail(
    $input: SendActivationStepRestorationEmailInput!
  ) {
    sendActivationStepRestorationEmail(input: $input) {
      activation {
        id
        steps {
          nodes {
            ...ActivationStepFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${ACTIVATION_STEP_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

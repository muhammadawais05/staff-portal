import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation RejectSpecializationApplication(
    $input: RejectSpecializationApplicationInput!
  ) {
    rejectSpecializationApplication(input: $input) {
      emailTemplate {
        id
      }
      nextActionPerformable
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

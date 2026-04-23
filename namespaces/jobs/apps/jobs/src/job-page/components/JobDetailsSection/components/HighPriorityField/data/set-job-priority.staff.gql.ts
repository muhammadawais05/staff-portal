import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetJobPriority($input: SetJobPriorityInput!) {
    setJobPriority(input: $input) {
      job {
        id
        highPriority
        highPriorityReason
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

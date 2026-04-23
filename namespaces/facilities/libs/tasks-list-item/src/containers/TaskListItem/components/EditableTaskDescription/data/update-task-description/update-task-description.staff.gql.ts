import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateTaskDescription($input: UpdateTaskDescriptionInput!) {
    updateTaskDescription(input: $input) {
      ...MutationResultFragment
      task {
        id
        description
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

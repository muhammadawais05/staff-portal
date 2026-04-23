import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation ChangeTalentActivationDeadline(
    $input: ChangeTalentActivationDeadlineInput!
  ) {
    changeTalentActivationDeadline(input: $input) {
      talent {
        id
        activation {
          id
          status
          steps {
            nodes {
              id
              status
              deadlineAt
            }
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

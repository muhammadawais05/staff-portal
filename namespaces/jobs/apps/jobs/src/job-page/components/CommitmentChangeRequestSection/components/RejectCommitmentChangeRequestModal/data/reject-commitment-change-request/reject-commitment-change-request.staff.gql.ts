import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation RejectCommitmentChangeRequest(
    $input: RejectCommitmentChangeRequestInput!
  ) {
    rejectCommitmentChangeRequest(input: $input) {
      ...MutationResultFragment

      emailTemplate {
        id
        name
      }

      commitmentChangeRequest {
        engagement {
          id
          client {
            id
            fullName
          }
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

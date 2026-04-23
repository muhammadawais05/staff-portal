import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const SEND_TOP = gql`
  mutation SendTop($input: SendTopInput!) {
    sendTop(input: $input) {
      ...MutationResultFragment
      engagement {
        id
        job {
          id
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

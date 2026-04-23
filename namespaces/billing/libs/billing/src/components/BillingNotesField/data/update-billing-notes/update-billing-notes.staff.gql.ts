import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateBillingNotes($input: UpdateBillingNotesInput!) {
    updateBillingNotes(input: $input) {
      ...MutationResultFragment
      roleOrClient {
        ... on Talent {
          id
          billingNotes
        }
        ... on Client {
          id
          billingNotes
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

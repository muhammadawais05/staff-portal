import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateBillingNotesDocument } from './set-update-billing-notes.staff.gql.types'

export default gql`
  mutation UpdateBillingNotes($input: UpdateBillingNotesInput!) {
    updateBillingNotes(input: $input) {
      ...MutationResultFragment
      roleOrClient {
        ... on Staff {
          id
          billingNotes
        }
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateBillingNotes = ({ onError }: { onError: () => void }) =>
  useMutation(UpdateBillingNotesDocument, {
    onError
  })

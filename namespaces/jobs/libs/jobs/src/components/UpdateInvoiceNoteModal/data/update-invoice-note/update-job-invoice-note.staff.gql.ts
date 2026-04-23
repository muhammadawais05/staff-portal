import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { EditJobInvoiceNoteDocument } from './update-job-invoice-note.staff.gql.types'

export const UPDATE_JOB_INVOICE_NOTE: typeof EditJobInvoiceNoteDocument = gql`
  mutation EditJobInvoiceNote($input: EditJobInvoiceNoteInput!) {
    editJobInvoiceNote(input: $input) {
      ...MutationResultFragment
      job {
        id
        invoiceNote
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateJobInvoiceNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: () => void
  onError: (error: Error) => void
}) =>
  useMutation(UPDATE_JOB_INVOICE_NOTE, {
    onCompleted,
    onError,
    refetchQueries: []
  })

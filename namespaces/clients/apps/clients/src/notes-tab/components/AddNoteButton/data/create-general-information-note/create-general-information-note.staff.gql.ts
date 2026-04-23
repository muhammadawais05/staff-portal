import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateGeneralInformationClientNoteDocument,
  CreateGeneralInformationClientNoteMutation
} from './create-general-information-note.staff.gql.types'

export const CREATE_GENERAL_INFORMATION_CLIENT_NOTE: typeof CreateGeneralInformationClientNoteDocument = gql`
  mutation CreateGeneralInformationClientNote(
    $input: CreateGeneralInformationClientNoteInput!
  ) {
    createGeneralInformationClientNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateGeneralInformationClientNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateGeneralInformationClientNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_GENERAL_INFORMATION_CLIENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })

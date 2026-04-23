import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateCommunicationClientNoteDocument,
  CreateCommunicationClientNoteMutation
} from './create-communication-note.staff.gql.types'

export const CREATE_COMMUNICATION_CLIENT_NOTE: typeof CreateCommunicationClientNoteDocument = gql`
  mutation CreateCommunicationClientNote(
    $input: CreateCommunicationClientNoteInput!
  ) {
    createCommunicationClientNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateCommunicationClientNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateCommunicationClientNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_COMMUNICATION_CLIENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })

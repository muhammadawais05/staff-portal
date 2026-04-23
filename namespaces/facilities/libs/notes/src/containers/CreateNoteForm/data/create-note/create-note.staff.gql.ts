import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateNoteDocument,
  CreateNoteMutation
} from './create-note.staff.gql.types'

export const CREATE_NOTE: typeof CreateNoteDocument = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateNoteMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(CREATE_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })

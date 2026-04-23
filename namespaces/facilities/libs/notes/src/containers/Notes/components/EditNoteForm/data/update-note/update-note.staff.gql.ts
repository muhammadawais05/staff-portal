import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { NOTE_FRAGMENT } from '../../../../../../data/note-fragment'
import {
  UpdateNoteDocument,
  UpdateNoteMutation
} from './update-note.staff.gql.types'

export const UPDATE_NOTE: typeof UpdateNoteDocument = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      note {
        ...NoteFragment
      }

      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${NOTE_FRAGMENT}
`

export const useUpdateNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UpdateNoteMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(UPDATE_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })

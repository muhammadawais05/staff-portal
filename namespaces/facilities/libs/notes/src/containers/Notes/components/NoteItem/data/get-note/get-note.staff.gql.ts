import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { NOTE_WITH_OPTIONS_FRAGMENT } from '../../../../../../data/note-fragment'
import { GetNoteDocument } from './get-note.staff.gql.types'

export const GET_NOTE: typeof GetNoteDocument = gql`
  query GetNote($noteId: ID!, $isForEdit: Boolean!) {
    node(id: $noteId) {
      ... on Note {
        ...NoteWithOptionFragment
      }
    }
  }

  ${NOTE_WITH_OPTIONS_FRAGMENT}
`

export const useGetNote = ({
  noteId,
  onCompleted
}: {
  noteId: string
  onCompleted?: () => void
}) => {
  const [fetch, { data, error, ...restOptions }] = useLazyQuery(GET_NOTE, {
    variables: { noteId, isForEdit: true },
    onCompleted
  })

  const note = data?.node

  if (error && !note) {
    throw error
  }

  return {
    note,
    error,
    getNote: fetch,
    ...restOptions
  }
}

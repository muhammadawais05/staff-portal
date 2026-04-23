import { gql } from '@apollo/client'

import { noteItemFragment } from '../../__fragments__/noteItemFragment.graphql'

export default gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      note {
        ...NoteItem
      }
      success
      errors {
        code
        key
        message
      }
    }
  }

  ${noteItemFragment}
`

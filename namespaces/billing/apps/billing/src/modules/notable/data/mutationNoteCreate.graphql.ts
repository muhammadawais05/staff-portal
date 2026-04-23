import { gql } from '@apollo/client'

import { noteItemFragment } from '../../__fragments__/noteItemFragment.graphql'

export default gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
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

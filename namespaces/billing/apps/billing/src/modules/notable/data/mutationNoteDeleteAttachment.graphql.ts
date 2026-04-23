import { gql } from '@apollo/client'

import { noteItemFragment } from '../../__fragments__/noteItemFragment.graphql'

export default gql`
  mutation RemoveNoteAttachment($noteId: ID!) {
    removeNoteAttachment(input: { noteId: $noteId }) {
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

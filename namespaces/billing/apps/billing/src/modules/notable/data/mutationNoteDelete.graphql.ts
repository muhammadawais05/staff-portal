import { gql } from '@apollo/client'

export default gql`
  mutation RemoveNote($noteId: ID!) {
    removeNote(input: { noteId: $noteId }) {
      note {
        id
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`

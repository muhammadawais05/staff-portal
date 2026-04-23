import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation EditDocumentNote($input: EditDocumentNoteInput!) {
    editDocumentNote(input: $input) {
      commercialDocument {
        ... on Invoice {
          id
          documentNote
          operations {
            addDocumentNote {
              ...OperationItem
            }
            editDocumentNote {
              ...OperationItem
            }
          }
        }
        ... on Payment {
          id
          documentNote
          operations {
            addDocumentNote {
              ...OperationItem
            }
            editDocumentNote {
              ...OperationItem
            }
          }
        }
      }
      notice
      success
      errors {
        message
        code
        key
      }
    }
  }

  ${operationItemFragment}
`

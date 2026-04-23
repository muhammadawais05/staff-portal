import { gql } from '@apollo/client'

export default gql`
  query GetCommercialDocumentUpdateDueDate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        documentNumber
        dueDate
        id
      }
      ... on Payment {
        documentNumber
        dueDate
        id
      }
    }
  }
`

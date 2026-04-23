import { gql } from '@apollo/client'

export default gql`
  query GetDocumentNote($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        documentNote
      }
      ... on Payment {
        id
        documentNote
      }
    }
  }
`

import { gql } from '@apollo/client'

export default gql`
  query GetUpdateIssueDate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        documentNumber
        createdOn
        issueDate
        id
      }
    }
  }
`

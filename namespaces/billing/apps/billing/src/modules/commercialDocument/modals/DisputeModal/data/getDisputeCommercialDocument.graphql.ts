import { gql } from '@apollo/client'

export default gql`
  query GetDisputeCommercialDocument($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        documentNumber
        id
        pendingTalentPayments
      }
      ... on Payment {
        documentNumber
        id
      }
    }
  }
`

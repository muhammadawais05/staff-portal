import { gql } from '@apollo/client'

export default gql`
  query GetUnappliedCashEntries($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        unappliedCashEntries {
          nodes {
            ...UnappliedCashEntry
          }
        }
      }
    }
  }

  fragment UnappliedCashEntry on UnappliedCash {
    id
    amount
    availableAmount
    effectiveDate
  }
`

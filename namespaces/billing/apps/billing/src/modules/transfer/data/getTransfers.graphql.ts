import { gql } from '@apollo/client'

export default gql`
  query GetTransfers($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        transfers {
          nodes {
            ...TransferFragment
          }
        }
      }
      ... on Payment {
        id
        transfers {
          nodes {
            ...TransferFragment
          }
        }
      }
    }
  }
`

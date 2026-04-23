import { gql } from '@apollo/client'
import { memorandumItem } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql'

export default gql`
  query GetCommercialDocumentMemorandums($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        memorandums {
          nodes {
            ...MemorandumItem
          }
        }
        associatedMemorandums {
          nodes {
            ...MemorandumItem
          }
        }
      }
      ... on Payment {
        id
        memorandums {
          nodes {
            ...MemorandumItem
          }
        }
        associatedMemorandums {
          nodes {
            ...MemorandumItem
          }
        }
      }
    }
  }

  ${memorandumItem}
`

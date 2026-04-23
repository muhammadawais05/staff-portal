import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderLineJobs($id: ID!) {
    node(id: $id) {
      ... on PurchaseOrderLine {
        id
        jobs {
          nodes {
            ...GetJobListItem
          }
        }
        engagements {
          nodes {
            ...GetEngagementListItem
          }
        }
      }
    }
  }
`

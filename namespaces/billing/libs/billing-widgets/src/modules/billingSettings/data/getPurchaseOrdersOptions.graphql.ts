import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrdersOptions(
    $jobId: ID!
    $include: [ID!]
    $exclude: [ID!]
  ) {
    node(id: $jobId) {
      ... on Job {
        id
        client {
          purchaseOrdersNullable(filter: { assignable: true }) {
            nodes {
              id
              client {
                fullName
              }
              webResource {
                ...WebResourceFragment
              }
              purchaseOrderLines(
                filter: { assignable: true, with: $include, except: $exclude }
              ) {
                nodes {
                  ...PurchaseOrderLineOption
                }
              }
            }
          }
        }
      }
    }
  }
`

import { gql } from '@apollo/client'

export default gql`
  query GetConsolidationDefaults($id: ID!) {
    node(id: $id) {
      ... on Client {
        id
        consolidationDefaults(order: { field: CREATED_AT, direction: DESC }) {
          nodes {
            name
            id
            deleted
            creationDate
            engagements {
              nodes {
                id
                isWorking
                purchaseOrderLine {
                  id
                  poLineNumber
                  webResource {
                    ...WebResourceFragment
                  }
                  purchaseOrder {
                    id
                    poNumber
                  }
                }
                client {
                  id
                  fullName
                  webResource {
                    ...WebResourceFragment
                  }
                }
                job {
                  id
                  title
                  purchaseOrderLine {
                    id
                    poLineNumber
                    webResource {
                      ...WebResourceFragment
                    }
                    purchaseOrder {
                      id
                      poNumber
                    }
                  }
                  webResource {
                    ...WebResourceFragment
                  }
                }
                talent {
                  id
                  fullName
                  webResource {
                    ...WebResourceFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

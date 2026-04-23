import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderLinesForInvoice($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        id
        job {
          purchaseOrderLine {
            id
            poLineNumber
          }
          nextPurchaseOrderLine {
            id
            poLineNumber
          }
        }
        # maybe remove this
        purchaseOrder {
          id
        }
        purchaseOrderLine {
          id
          purchaseOrder {
            id
          }
        }
        subjectObject {
          id
          purchaseOrdersNullable(filter: { assignable: true }) {
            nodes {
              id
              poNumber
              budgetLeft
              webResource {
                ...WebResourceFragment
              }
              purchaseOrderLines(filter: { assignable: true }) {
                nodes {
                  id
                  poLineNumber
                  budgetLeft
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

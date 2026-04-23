import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { purchaseOrderFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql'

export default gql`
  mutation UpdateInvoicePurchaseOrder($input: AssignPurchaseOrderInput!) {
    assignPurchaseOrder(input: $input) {
      invoice {
        id
        amountWithCorrections
        balanceDue
        invoiceKind
        job {
          id
          nextPurchaseOrder {
            id
            poNumber
          }
          purchaseOrder {
            id
            poNumber
          }
        }
        exceedsPurchaseOrderBalance
        operations {
          assignPurchaseOrder {
            ...OperationItem
          }
        }
        purchaseOrder {
          ...PurchaseOrderFragment
        }
        reason {
          ... on Engagement {
            id
            # nextPurchaseOrder does not exist on Engagement, only on Job
            # https://toptal-core.atlassian.net/browse/ROGUE-1236
            purchaseOrder {
              id
              poNumber
            }
          }
          ... on Job {
            id
            nextPurchaseOrder {
              id
              poNumber
            }
            purchaseOrder {
              id
              poNumber
            }
          }
        }
        subjectObject {
          id
          # Temporary rename
          # https://github.com/toptal/platform/pull/45426/files
          purchaseOrders: purchaseOrdersNullable {
            nodes {
              ...PurchaseOrderFragment
            }
          }
        }
      }
      success
      errors {
        message
        key
        code
      }
    }
  }

  ${webResourceFragment}
  ${purchaseOrderFragment}
`

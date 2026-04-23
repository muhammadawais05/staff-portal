import { gql } from '@apollo/client'

export const billingSettingsJobFragment = gql`
  fragment BillingSettingsJobFragment on Job {
    id
    title
    invoiceNote
    autoConsolidationEnabled
    attachTimesheetsToInvoices
    operations {
      assignPurchaseOrder {
        ...OperationItem
      }
      assignPurchaseOrderLine {
        ...OperationItem
      }
      assignNextPurchaseOrder {
        ...OperationItem
      }
      updateAttachTimesheetsToInvoices {
        ...OperationItem
      }
      editJobInvoiceNote {
        ...OperationItem
      }
    }
    purchaseOrder {
      id
      poNumber
      webResource {
        ...WebResourceFragment
      }
    }
    purchaseOrderLine {
      ...PurchaseOrderLineOption
    }
    nextPurchaseOrderLine {
      ...PurchaseOrderLineOption
    }
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
          purchaseOrderLines {
            nodes {
              ...PurchaseOrderLineOption
            }
          }
        }
      }
    }
    nextPurchaseOrder {
      id
      poNumber
      webResource {
        ...WebResourceFragment
      }
    }
    commitment
    engagements {
      nodes {
        id
        talent {
          fullName
        }
      }
    }
  }

  fragment PurchaseOrderLineOption on PurchaseOrderLine {
    id
    poLineNumber
    client {
      fullName
    }
    webResource {
      ...WebResourceFragment
    }
    purchaseOrder {
      id
      poNumber
      webResource {
        ...WebResourceFragment
      }
    }
  }
`

import { gql } from '@staff-portal/data-layer-service'

export const GET_EDIT_PURCHASE_ORDER_DATA = gql`
  query GetEditPurchaseOrderData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        purchaseOrder {
          id
          poNumber
        }
        purchaseOrderLine {
          id
          poLineNumber
          purchaseOrder {
            id
            poNumber
          }
        }
        job {
          id
          title
          purchaseOrderLine {
            id
            poLineNumber
            purchaseOrder {
              id
              poNumber
            }
          }
          purchaseOrder {
            id
            poNumber
          }
        }
        selectablePurchaseOrders {
          nodes {
            ...SelectablePurchaseOrderFragment
          }
        }
      }
    }
  }

  fragment SelectablePurchaseOrderFragment on PurchaseOrder {
    id
    poNumber
    client {
      id
      fullName
    }
    purchaseOrderLines(filter: { assignable: true }) {
      nodes {
        ...SelectablePurchaseOrderLineFragment
      }
    }
  }

  fragment SelectablePurchaseOrderLineFragment on PurchaseOrderLine {
    id
    poLineNumber
    client {
      id
      fullName
    }
  }
`

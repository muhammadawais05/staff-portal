import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrdersList(
    $pagination: OffsetPagination!
    $filter: PurchaseOrderSearchFilter!
  ) {
    purchaseOrders: purchaseOrdersNullable(
      pagination: $pagination
      filter: $filter
    ) {
      totalCount
      operations {
        createPurchaseOrder {
          ...OperationItem
        }
      }
      nodes {
        ...PurchaseOrderListItemFragment
      }
    }
  }
`

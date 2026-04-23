import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { GetClientPurchaseOrdersDocument } from '.'

export default gql`
  query GetClientPurchaseOrders($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        netTerms
        availableNetTerms
        ...PurchaseOrdersFragment
      }
    }
  }

  fragment PurchaseOrdersFragment on Client {
    purchaseOrdersNullable(filter: { assignable: true }) {
      nodes {
        id
        poNumber
        client {
          id
          fullName
        }
        ...WebResourceFragment
        purchaseOrderLines(filter: { assignable: true }) {
          nodes {
            id
            poLineNumber
            client {
              fullName
            }
            ...WebResourceFragment
            purchaseOrder {
              id
              poNumber
              ...WebResourceFragment
            }
          }
        }
      }
      totalCount
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
`

export const useGetClientPurchaseOrders = (clientId: string) => {
  const { data, loading } = useGetNode(GetClientPurchaseOrdersDocument)({
    clientId
  })

  return {
    data,
    loading
  }
}

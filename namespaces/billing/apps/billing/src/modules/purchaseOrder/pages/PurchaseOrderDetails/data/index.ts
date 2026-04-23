import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import {
  useGetPurchaseOrderDetailsQuery,
  GetPurchaseOrderDetailsQuery
} from './getPurchaseOrderDetails.graphql.types'

export const useGetPurchaseOrderDetails = (purchaseOrderId: string) =>
  useGetNode(useGetPurchaseOrderDetailsQuery)({ id: purchaseOrderId })

export type { GetPurchaseOrderDetailsQuery }

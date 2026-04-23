import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import {
  useGetPurchaseOrderLineDetailsQuery,
  GetPurchaseOrderLineDetailsQuery
} from './getPurchaseOrderLineDetails.graphql.types'

export const useGetPurchaseOrderLineDetails = (purchaseOrderLineId: string) =>
  useGetNode(useGetPurchaseOrderLineDetailsQuery)({ id: purchaseOrderLineId })

export { useGetPurchaseOrderLineDetailsAttributesLazyQuery } from './getPurchaseLineOrderDetailsAttributes.graphql.types'
export type { GetPurchaseOrderLineDetailsQuery }
export { useGetPurchaseOrderLineArchiveStateQuery } from '../../../data/getPurchaseOrderLineArchiveState.graphql.types'
export { useSetUpdatePurchaseOrderLineMutation } from './setUpdatePurchaseOrderLine.graphql.types'

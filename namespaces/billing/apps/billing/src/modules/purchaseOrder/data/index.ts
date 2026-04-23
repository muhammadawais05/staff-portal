import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetPurchaseOrderInvoicesQuery } from './getPurchaseOrderInvoices.graphql.types'
import { useGetPurchaseOrderLinesDetailsQuery } from './getPurchaseOrderLinesDetails.graphql.types'
import { useGetPurchaseOrderLineJobsQuery } from './getPurchaseOrderLineJobs.graphql.types'
import { useGetPurchaseOrderLinesToUpdateQuery } from './getPurchaseOrderLinesToUpdate.graphql.types'

interface Pagination {
  limit: number
  offset: number
}

export const useGetPurchaseOrderInvoices = (
  nodeId: string,
  pagination: Pagination
) => useGetNode(useGetPurchaseOrderInvoicesQuery)({ nodeId, pagination })

export const useGetPurchaseOrderLinesDetails = (nodeId: string) =>
  useGetNode(useGetPurchaseOrderLinesDetailsQuery)({ nodeId })

export { useGetPurchaseOrderInvoicesQuery }

export { useGetPurchaseOrdersListQuery } from './getPurchaseOrdersList.graphql.types'

export const useGetPurchaseOrderLinesToUpdate = (nodeId: string) =>
  useGetNode(useGetPurchaseOrderLinesToUpdateQuery)({ nodeId })

export type { GetPurchaseOrdersListQuery } from './getPurchaseOrdersList.graphql.types'

export const useGetPurchaseOrderLineJobs = (nodeId: string) =>
  useGetNode(useGetPurchaseOrderLineJobsQuery)({ id: nodeId })

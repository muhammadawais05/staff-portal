import { useContext } from 'react'
import { PurchaseOrderSearchFilter } from '@staff-portal/graphql/staff'
import {
  createListContext,
  ListQueryParams
} from '@staff-portal/billing/src/components/ListContext/ListContext'

import { GetPurchaseOrdersListQuery } from '../../data/getPurchaseOrdersList.graphql.types'

export interface PurchaseOrderListQueryParams extends ListQueryParams {}

export type PurchaseOrders = Exclude<
  GetPurchaseOrdersListQuery['purchaseOrders'],
  undefined | null
>

export const PurchaseOrdersListContext = createListContext<
  PurchaseOrders,
  null,
  PurchaseOrderSearchFilter,
  PurchaseOrderListQueryParams
>()

export const usePurchaseOrdersListContext = () =>
  useContext(PurchaseOrdersListContext)

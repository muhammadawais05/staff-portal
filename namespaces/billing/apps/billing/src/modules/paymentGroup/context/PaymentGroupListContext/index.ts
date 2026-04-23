import { useContext } from 'react'
import { PaymentGroupsFilter } from '@staff-portal/graphql/staff'
import {
  createListContext,
  ListQueryParams
} from '@staff-portal/billing/src/components/ListContext/ListContext'

import { GetPaymentGroupsListQuery } from '../../data'

export interface PaymentGroupListQueryParams extends ListQueryParams {}

export type PaymentGroups = Exclude<
  GetPaymentGroupsListQuery['paymentGroupsNullable'],
  undefined | null
>

export const PaymentGroupListContext = createListContext<
  PaymentGroups,
  null,
  PaymentGroupsFilter,
  PaymentGroupListQueryParams
>()

export const usePaymentGroupListContext = () =>
  useContext(PaymentGroupListContext)

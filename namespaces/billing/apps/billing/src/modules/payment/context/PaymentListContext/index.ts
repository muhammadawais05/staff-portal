import { useContext } from 'react'
import { PaymentsFilter } from '@staff-portal/graphql/staff'
import {
  createListContext,
  ListQueryParams
} from '@staff-portal/billing/src/components/ListContext/ListContext'

import { GetPaymentsListQuery } from '../../data/getPaymentsList.graphql.types'
import { GetPaymentsMonthlyTotalsQuery } from '../../data/getMonthlyTotalsPaymentsList.graphql.types'
import { GetReceivedPaymentsListQuery } from '../../../receivedPayments/data/getReceivedPaymentsList.graphql.types'

export interface PaymentListQueryParams extends ListQueryParams {}

export type Payments =
  | Exclude<GetPaymentsListQuery['payments'], null | undefined>
  | Exclude<GetReceivedPaymentsListQuery['payments'], null | undefined>

export type MonthlyTotals = Exclude<
  GetPaymentsMonthlyTotalsQuery['payments'],
  undefined | null
>

export const PaymentListContext = createListContext<
  Payments,
  MonthlyTotals,
  PaymentsFilter,
  PaymentListQueryParams
>()

export const usePaymentListContext = () => useContext(PaymentListContext)

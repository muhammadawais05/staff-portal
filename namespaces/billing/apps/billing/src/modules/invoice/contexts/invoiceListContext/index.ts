import { useContext } from 'react'
import { InvoicesFilter } from '@staff-portal/graphql/staff'
import {
  createListContext,
  ListQueryParams
} from '@staff-portal/billing/src/components/ListContext/ListContext'

import { GetInvoicesMonthlyTotalsQuery } from '../../data/getMonthlyTotalsInvoiceList.graphql.types'
import { GetInvoicesListQuery } from '../../data/getInvoicesList.graphql.types'

export type Invoices = Exclude<
  GetInvoicesListQuery['invoices'],
  null | undefined
>
export type MonthlyTotals = Exclude<
  GetInvoicesMonthlyTotalsQuery['invoices'],
  undefined | null
>

export interface InvoiceListQueryParams extends ListQueryParams {}

export const InvoiceListContext = createListContext<
  Invoices,
  MonthlyTotals,
  InvoicesFilter,
  InvoiceListQueryParams
>()

export const useInvoiceListContext = () => useContext(InvoiceListContext)

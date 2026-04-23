import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

export { useGetInvoicesListQuery } from './getInvoicesList.graphql.types'
export { useGetInvoicesMonthlyTotalsQuery } from './getMonthlyTotalsInvoiceList.graphql.types'
export { useGetConsolidatedInvoices } from './useGetConsolidatedInvoices'
import { useGetPurchaseOrderLinesForInvoiceQuery } from './getPurchaseOrderLinesForInvoice.graphql.types'

export const useGetPurchaseOrderLinesForInvoice = (invoiceId: string) =>
  useGetNode(useGetPurchaseOrderLinesForInvoiceQuery)({ invoiceId })

export { useAssignPurchaseOrderLineToInvoiceMutation } from './assignPurchaseOrderLineToInvoice.graphql.types'

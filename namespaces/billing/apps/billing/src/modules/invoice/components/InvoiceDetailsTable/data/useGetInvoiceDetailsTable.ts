import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetInvoiceDetailsTableQuery } from './getInvoiceDetailsTable.graphql.types'

export const useGetInvoiceDetailsTable = (invoiceId: string) =>
  useGetNode(useGetInvoiceDetailsTableQuery)({ invoiceId })

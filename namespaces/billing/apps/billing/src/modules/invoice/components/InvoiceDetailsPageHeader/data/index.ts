import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetInvoiceDetailsHeaderQuery } from './getInvoiceDetailsHeader.graphql.types'

export const useGetInvoiceDetailsHeader = (invoiceId: string) =>
  useGetNode(useGetInvoiceDetailsHeaderQuery)({ invoiceId })

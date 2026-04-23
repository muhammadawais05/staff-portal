import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetInvoiceTaskCardQuery } from './getInvoiceTaskCard.graphql.types'

export const useGetInvoiceTaskCard = (invoiceId: string) =>
  useGetNode(useGetInvoiceTaskCardQuery)({ invoiceId })

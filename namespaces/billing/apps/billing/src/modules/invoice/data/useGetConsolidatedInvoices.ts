import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetConsolidatedInvoicesQuery } from './getConsolidatedInvoices.graphql.types'

export const useGetConsolidatedInvoices = (invoiceId: string) =>
  useGetNode(useGetConsolidatedInvoicesQuery)(
    { invoiceId },
    { fetchPolicy: 'network-only' }
  )

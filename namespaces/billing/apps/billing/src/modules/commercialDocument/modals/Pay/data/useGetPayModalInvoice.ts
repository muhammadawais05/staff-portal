import { useGetPayModalInvoiceQuery } from './getPayModalInvoice.graphql.types'

export const useGetPayModalInvoice = (paymentId: string) =>
  useGetPayModalInvoiceQuery({
    variables: { id: paymentId },
    fetchPolicy: 'network-only'
  })

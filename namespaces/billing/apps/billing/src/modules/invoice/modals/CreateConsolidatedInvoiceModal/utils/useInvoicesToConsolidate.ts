import { InvoicesFilter, SearchLogic } from '@staff-portal/graphql/staff'

import { useGetClientsToConsolidateQuery } from '../data'
import { useGetInvoicesToConsolidateQuery } from '../../../components/InvoiceList/data/getInvoicesToConsolidate.graphql.types'

const useInvoicesToConsolidate = (filter: InvoicesFilter = {}) => {
  const clientId = filter?.badges?.clientIds?.[0] || ''
  const {
    data: { node } = {},
    loading: selectiveConsolidationLoading,
    initialLoading: selectiveConsolidationInitialLoading
  } = useGetClientsToConsolidateQuery({
    variables: { id: clientId }
  })
  const variables = {
    clientId,
    netTerms: 0
  }
  const clients = node?.hierarchy?.clients?.nodes.filter(
    client => Number(client.invoices?.totalCount) > 0
  )

  const { data, loading, initialLoading } = useGetInvoicesToConsolidateQuery({
    skip: selectiveConsolidationLoading,
    variables: {
      clientId,
      filter: {
        ...filter,
        badges: {
          ...filter?.badges,
          ...{ clientIds: clients?.map(({ id }) => id) },
          logic: SearchLogic.OR
        },
        forConsolidation: true
      }
    },
    fetchPolicy: 'network-only'
  })

  const invoices =
    data?.invoices?.groups?.flatMap(group => group.invoices) ?? []
  const initialValues = {
    billTo: clientId,
    invoiceIds: [],
    isEverythingSelected: false,
    netTerms: data?.availableBillingTerms?.netTerms
  }

  return {
    initialValues,
    invoices,
    clientId,
    variables,
    clients,
    loading,
    availableBillingTerms: data?.availableBillingTerms,
    initialLoading: initialLoading || selectiveConsolidationInitialLoading
  }
}

export default useInvoicesToConsolidate

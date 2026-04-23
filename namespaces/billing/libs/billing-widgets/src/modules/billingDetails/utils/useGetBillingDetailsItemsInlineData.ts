import { OperationVariables } from '@apollo/client'

import {
  useGetClientBillingAutoAllocateMemosLazyQuery,
  useGetClientBillingNotifyAboutNewInvoicesLazyQuery,
  useGetClientBillingAttachTimesheetsToInvoicesLazyQuery,
  useGetClientBillingInvestmentGradeLazyQuery
} from '../data'

interface Options extends OperationVariables {
  variables?: {
    clientId: string
  }
}

const useGetBillingDetailsItemsInlineData = (options: Options) => {
  const queryOptions: Options = {
    fetchPolicy: 'network-only',
    ...options
  }

  const autoAllocateMemos =
    useGetClientBillingAutoAllocateMemosLazyQuery(queryOptions)
  const notifyAboutNewInvoices =
    useGetClientBillingNotifyAboutNewInvoicesLazyQuery(queryOptions)

  const attachTimesheetsToInvoices =
    useGetClientBillingAttachTimesheetsToInvoicesLazyQuery(queryOptions)

  const investmentGrade =
    useGetClientBillingInvestmentGradeLazyQuery(queryOptions)

  return {
    getClientBillingAutoAllocateMemos: () => {
      const [request, { data, loading, error }] = autoAllocateMemos

      return {
        request,
        data: Number(data?.node?.autoAllocateMemos ?? -1),
        loading,
        error
      }
    },
    getClientBillingNotifyAboutNewInvoices: () => {
      const [request, { data, loading, error }] = notifyAboutNewInvoices

      return {
        request,
        data: Number(data?.node?.notifyAboutNewInvoices ?? -1),
        loading,
        error
      }
    },
    getClientBillingAttachTimesheetsToInvoices: () => {
      const [request, { data, loading, error }] = attachTimesheetsToInvoices

      return {
        request,
        data: Number(data?.node?.attachTimesheetsToInvoices ?? -1),
        loading,
        error
      }
    },
    getClientBillingInvestmentGrade: () => {
      const [request, { data, loading, error }] = investmentGrade

      return {
        request,
        data: Number(data?.node?.investmentGrade ?? -1),
        loading,
        error
      }
    }
  }
}

export default useGetBillingDetailsItemsInlineData

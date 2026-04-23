import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import {
  useSetUpdateClientNotifyAboutNewInvoicesMutation,
  useSetUpdateClientAutoAllocateMemosMutation,
  useSetUpdateClientAttachTimesheetsToInvoicesMutation,
  useSetUpdateClientInvestmentGradeMutation
} from '../data'

export const useBillingDetailsItemsInlineUpdate = () => {
  const { handleOnRootLevelError } = useFormSubmission()
  const [updateClientNotifyAboutNewInvoicesMutation] =
    useSetUpdateClientNotifyAboutNewInvoicesMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const [updateClientAutoAllocateMemosMutation] =
    useSetUpdateClientAutoAllocateMemosMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const [updateClientAttachTimesheetsToInvoicesMutation] =
    useSetUpdateClientAttachTimesheetsToInvoicesMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const [updateClientInvestmentGradeMutation] =
    useSetUpdateClientInvestmentGradeMutation({
      onRootLevelError: handleOnRootLevelError
    })

  return {
    updateClientNotifyAboutNewInvoicesMutation,
    updateClientAutoAllocateMemosMutation,
    updateClientAttachTimesheetsToInvoicesMutation,
    updateClientInvestmentGradeMutation
  }
}

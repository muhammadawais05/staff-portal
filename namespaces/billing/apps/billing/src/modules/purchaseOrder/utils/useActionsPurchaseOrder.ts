import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ErrorResponse } from '@apollo/client/link/error'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  getMessagesFromErrors,
  getMutationErrorMessage
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import i18n from '@staff-portal/billing/src/utils/i18n'

import {
  SetArchivePurchaseOrderMutation,
  useSetArchivePurchaseOrderMutation
} from '../data/setArchivePurchaseOrder.graphql.types'
import {
  SetUnarchivePurchaseOrderMutation,
  useSetUnarchivePurchaseOrderMutation
} from '../data/setUnarchivePurchaseOrder.graphql.types'

export const useActionsPurchaseOrder = () => {
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleOnRootLevelError } = useFormSubmission()
  const [archiveMutation] = useSetArchivePurchaseOrderMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const [unarchiveMutation] = useSetUnarchivePurchaseOrderMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const handleOnArchivePurchaseOrder = async (
    purchaseOrderId: string,
    archived: boolean
  ) => {
    try {
      const callMutation = archived ? unarchiveMutation : archiveMutation
      const result = await callMutation({
        variables: {
          input: {
            purchaseOrderId
          }
        }
      })

      const actualRes = archived
        ? (result?.data as SetUnarchivePurchaseOrderMutation)
            ?.unarchivePurchaseOrder
        : (result?.data as SetArchivePurchaseOrderMutation)
            ?.archivePurchaseOrder

      if (actualRes?.success) {
        showSuccess(
          i18n.t(
            `purchaseOrder:mutation.${
              archived ? 'unarchivePurchaseOrder' : 'archivePurchaseOrder'
            }.notification.success`
          )
        )
        emitMessage(ApolloContextEvents.purchaseOrderArchiveToggle)
      } else {
        showError(
          getMessagesFromErrors({
            errors: actualRes?.errors || []
          })
        )
      }
    } catch (error) {
      showError(getMutationErrorMessage(error as ErrorResponse))
    }
  }

  return {
    handleOnArchivePurchaseOrder
  }
}

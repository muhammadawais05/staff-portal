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
  SetArchivePurchaseOrderLineMutation,
  useSetArchivePurchaseOrderLineMutation
} from '../data/setArchivePurchaseOrderLine.graphql.types'
import {
  SetUnarchivePurchaseOrderLineMutation,
  useSetUnarchivePurchaseOrderLineMutation
} from '../data/setUnarchivePurchaseOrderLine.graphql.types'

export const useActionsPurchaseOrderLine = () => {
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleOnRootLevelError } = useFormSubmission()
  const [archiveMutation] = useSetArchivePurchaseOrderLineMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const [unarchiveMutation] = useSetUnarchivePurchaseOrderLineMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const handleOnArchivePurchaseOrderLine = async (
    purchaseOrderLineId: string,
    archived: boolean
  ) => {
    try {
      const callMutation = archived ? unarchiveMutation : archiveMutation
      const result = await callMutation({
        variables: {
          input: {
            purchaseOrderLineId
          }
        }
      })

      const actualRes = archived
        ? (result?.data as SetUnarchivePurchaseOrderLineMutation)
            ?.unarchivePurchaseOrderLine
        : (result?.data as SetArchivePurchaseOrderLineMutation)
            ?.archivePurchaseOrderLine

      if (actualRes?.success) {
        showSuccess(
          i18n.t(
            `purchaseOrder:mutation.${
              archived
                ? 'unarchivePurchaseOrderLine'
                : 'archivePurchaseOrderLine'
            }.notification.success`
          )
        )
        emitMessage(ApolloContextEvents.purchaseOrderLineArchiveToggle)
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
    handleOnArchivePurchaseOrderLine
  }
}

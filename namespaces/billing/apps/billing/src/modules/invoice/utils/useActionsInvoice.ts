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

import { useSetApplyPromotionsMutation } from '../data/setApplyPromotion.graphql.types'

export const useActionsInvoice = () => {
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleOnRootLevelError } = useFormSubmission()
  const [subscribeMutationInvoiceApplyPromotions] =
    useSetApplyPromotionsMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const handleOnApplyPromotions = async (invoiceId: string) => {
    try {
      const result = await subscribeMutationInvoiceApplyPromotions({
        variables: {
          input: {
            invoiceId
          }
        }
      })

      if (result?.data?.applyPromotions?.success) {
        showSuccess(i18n.t('invoice:applyPromotions.notification.success'))
        emitMessage(ApolloContextEvents.invoiceApplyPromotions)
      } else {
        showError(
          getMessagesFromErrors({
            errors: result?.data?.applyPromotions?.errors as {
              key: string
              message: string
              code: string
            }[]
          })
        )
      }
    } catch (error) {
      showError(getMutationErrorMessage(error as ErrorResponse))
    }
  }

  return {
    handleOnApplyPromotions
  }
}

import { useTranslation } from 'react-i18next'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ErrorResponse } from '@apollo/client/link/error'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  getMessagesFromErrors,
  getMutationErrorMessage
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { useReverifyCreditCardBillingOptionMutation } from '../data'

export const useBillingOptionCreditCardActions = () => {
  const { t: translate } = useTranslation('billingDetails')
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleOnRootLevelError } = useFormSubmission()
  const [reverifyCreditCardBillingOption] =
    useReverifyCreditCardBillingOptionMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const handleOnReverifyCreditCardBillingOption = async (
    billingOptionId: string
  ) => {
    try {
      const result = await reverifyCreditCardBillingOption({
        variables: {
          input: {
            billingOptionId
          }
        }
      })

      const { success, errors } =
        result?.data?.reverifyCreditCardBillingOption || {}

      if (success) {
        showSuccess(
          translate(
            'actions.reverifyCreditCardBillingOption.notification.success',
            {
              billingOptionId
            }
          )
        )
        emitMessage(ApolloContextEvents.reverifyCreditCardBillingOption)
      } else {
        showError(
          getMessagesFromErrors({
            errors
          })
        )
      }
    } catch (error) {
      showError(getMutationErrorMessage(error as ErrorResponse))
    }
  }

  return {
    handleOnReverifyCreditCardBillingOption
  }
}

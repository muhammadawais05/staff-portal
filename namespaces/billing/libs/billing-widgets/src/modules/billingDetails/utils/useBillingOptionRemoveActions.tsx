import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useTranslation } from 'react-i18next'
import { ErrorResponse } from '@apollo/client/link/error'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  getMessagesFromErrors,
  getMutationErrorMessage
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'

import { UserErrorFragment } from '../../__fragments__/userErrorFragment.graphql.types'
import {
  useRemoveBillingOptionMutation,
  useRemoveEnterpriseBillingOptionMutation
} from '../data'
import BillingOptionConfirmRemoval from '../components/BillingOptionConfirmRemoval'

export const useBillingOptionRemoveActions = () => {
  const { t: translate } = useTranslation('billingDetails')
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleOnRootLevelError } = useFormSubmission()
  const [removeBillingOption] = useRemoveBillingOptionMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const [removeEnterpriseBillingOption] =
    useRemoveEnterpriseBillingOptionMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const {
    handleOnCloseConfirmation,
    handleOnOpenConfirmation,
    handleOnSetConfirmation
  } = useConfirmations()

  const handleRemoveBillingOption = async ({
    billingOptionId,
    isLastPullMethod,
    onRemoveBillingOption
  }: {
    billingOptionId: string
    isLastPullMethod?: boolean
    onRemoveBillingOption: () => Promise<{
      success?: boolean
      errors?: UserErrorFragment[]
    }>
  }) => {
    handleOnOpenConfirmation({
      actionTitle: translate(
        'actions.removeBillingOption.confirmRemove.submitText'
      ),
      actionVariant: 'negative',
      description: (
        <BillingOptionConfirmRemoval isLastPullMethod={isLastPullMethod} />
      ),
      title: translate('actions.removeBillingOption.confirmRemove.title', {
        billingOptionId
      }),
      onSuccess: async () => {
        try {
          handleOnSetConfirmation({
            actionIsLoading: true
          })
          const { success, errors } = await onRemoveBillingOption()

          if (success) {
            showSuccess(
              translate('actions.removeBillingOption.notification.success', {
                billingOptionId
              })
            )
            emitMessage(ApolloContextEvents.billingOptionRemove)
          } else {
            showError(
              getMessagesFromErrors({
                errors
              })
            )
          }
        } catch (error) {
          showError(getMutationErrorMessage(error as ErrorResponse))
        } finally {
          handleOnCloseConfirmation()
        }
      }
    })
  }

  const handleOnRemoveBillingOption = async ({
    billingOptionId,
    isLastPullMethod
  }: {
    billingOptionId: string
    isLastPullMethod?: boolean
  }) => {
    const onRemoveBillingOption = async () => {
      const result = await removeBillingOption({
        variables: {
          input: {
            billingOptionId
          }
        }
      })

      return {
        success: result.data?.removeBillingOption?.success,
        errors: result.data?.removeBillingOption?.errors
      }
    }

    return handleRemoveBillingOption({
      billingOptionId,
      isLastPullMethod,
      onRemoveBillingOption
    })
  }

  const handleOnRemoveEnterpriseBillingOption = async ({
    billingOptionId,
    isLastPullMethod
  }: {
    billingOptionId: string
    isLastPullMethod?: boolean
  }) => {
    const onRemoveBillingOption = async () => {
      const result = await removeEnterpriseBillingOption({
        variables: {
          input: {
            billingOptionId
          }
        }
      })

      return {
        success: result.data?.removeEnterpriseBillingOption?.success,
        errors: result.data?.removeEnterpriseBillingOption?.errors
      }
    }

    return handleRemoveBillingOption({
      billingOptionId,
      isLastPullMethod,
      onRemoveBillingOption
    })
  }

  return {
    handleOnRemoveBillingOption,
    handleOnRemoveEnterpriseBillingOption
  }
}

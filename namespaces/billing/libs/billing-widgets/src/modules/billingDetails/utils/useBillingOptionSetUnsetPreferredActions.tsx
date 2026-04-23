import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useTranslation } from 'react-i18next'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Typography, Container } from '@toptal/picasso'
import { ErrorResponse } from '@apollo/client/link/error'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  getMessagesFromErrors,
  getMutationErrorMessage
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'

import {
  usePreferEnterpriseBillingOptionMutation,
  useUnsetPreferredBillingOptionMutation
} from '../data'

export const useBillingOptionSetUnsetPreferredActions = () => {
  const { t: translate } = useTranslation('billingDetails')
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleOnRootLevelError } = useFormSubmission()
  const [preferEnterpriseBillingOption] =
    usePreferEnterpriseBillingOptionMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const [unsetPreferredBillingOption] = useUnsetPreferredBillingOptionMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const {
    handleOnCloseConfirmation,
    handleOnOpenConfirmation,
    handleOnSetConfirmation
  } = useConfirmations()

  const handleOnPreferEnterpriseBillingOption = async (
    billingOptionId: string
  ) => {
    try {
      const result = await preferEnterpriseBillingOption({
        variables: {
          input: {
            billingOptionId
          }
        }
      })

      if (result?.data?.preferEnterpriseBillingOption?.success) {
        showSuccess(
          translate(
            'actions.preferEnterpriseBillingOption.notification.success',
            {
              billingOptionId
            }
          )
        )
        emitMessage(ApolloContextEvents.preferEnterpriseBillingOption)
      } else {
        showError(
          getMessagesFromErrors({
            errors: result?.data?.preferEnterpriseBillingOption?.errors
          })
        )
      }
    } catch (error) {
      showError(getMutationErrorMessage(error as ErrorResponse))
    }
  }

  const handleOnUnsetPreferredBillingOption = async (
    billingOptionId: string
  ) => {
    const description = () => (
      <Container top={1}>
        <Typography data-testid='handleOnUnsetPreferredBillingOption'>
          {translate(
            'actions.unsetPreferredBillingOption.confirmUnset.message'
          )}
        </Typography>
      </Container>
    )

    handleOnOpenConfirmation({
      actionTitle: translate(
        'actions.unsetPreferredBillingOption.confirmUnset.submitText'
      ),
      description: description(),
      title: translate(
        'actions.unsetPreferredBillingOption.confirmUnset.title',
        { billingOptionId }
      ),
      onSuccess: async () => {
        try {
          handleOnSetConfirmation({
            actionIsLoading: true
          })
          const result = await unsetPreferredBillingOption({
            variables: {
              input: {
                billingOptionId
              }
            }
          })

          if (result?.data?.unsetPreferredBillingOption?.success) {
            showSuccess(
              translate(
                'actions.unsetPreferredBillingOption.notification.success',
                { billingOptionId }
              )
            )
            emitMessage(ApolloContextEvents.unsetPreferredBillingOption)
          } else {
            showError(
              getMessagesFromErrors({
                errors: result?.data?.unsetPreferredBillingOption?.errors
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

  return {
    handleOnPreferEnterpriseBillingOption,
    handleOnUnsetPreferredBillingOption
  }
}

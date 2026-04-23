import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useTranslation } from 'react-i18next'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Typography, Container } from '@toptal/picasso'
import { ErrorResponse } from '@apollo/client/link/error'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  decodeRawIdAndType,
  getMessagesFromErrors,
  getMutationErrorMessage
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'

import {
  useSetRemovePaymentFromPaymentGroupMutation,
  useSetRestorePaymentToPaymentGroupMutation
} from '../data'

export const useActionsPaymentGroup = () => {
  const { t: translate } = useTranslation('paymentGroup')
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleOnRootLevelError } = useFormSubmission()
  const [setRemovePaymentFromPaymentGroup] =
    useSetRemovePaymentFromPaymentGroupMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const [setRestorePaymentToPaymentGroup] =
    useSetRestorePaymentToPaymentGroupMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const { handleOnCloseConfirmation, handleOnOpenConfirmation } =
    useConfirmations()

  const handleOnRemovePaymentFromPaymentGroup = async ({
    paymentId,
    warningType
  }: {
    paymentId: string
    warningType?: 'withheld'
  }) => {
    const number = decodeRawIdAndType(paymentId).id
    let description

    switch (warningType) {
      case 'withheld':
        description = () => (
          <>
            {translate(
              'modals.removePaymentFromPaymentGroup.confirmRemove.message'
            )}
            <Container top={1}>
              <Typography
                color='red'
                weight='semibold'
                data-testid='handleOnRemovePaymentFromPaymentGroup-withheld'
              >
                {translate(
                  'modals.removePaymentFromPaymentGroup.confirmRemove.warning.withheld'
                )}
              </Typography>
            </Container>
          </>
        )
        break

      default:
        description = () =>
          translate(
            'modals.removePaymentFromPaymentGroup.confirmRemove.message'
          )
        break
    }

    handleOnOpenConfirmation({
      actionTitle: translate(
        'modals.removePaymentFromPaymentGroup.confirmRemove.submitText'
      ),
      description: description(),
      title: translate(
        'modals.removePaymentFromPaymentGroup.confirmRemove.title',
        { number }
      ),
      actionVariant: 'negative',
      onSuccess: async () => {
        try {
          const result = await setRemovePaymentFromPaymentGroup({
            variables: {
              input: {
                paymentId
              }
            }
          })

          if (result?.data?.removePaymentFromPaymentGroup?.success) {
            showSuccess(
              translate(
                'modals.removePaymentFromPaymentGroup.notification.success',
                { number }
              )
            )
            emitMessage(ApolloContextEvents.paymentRemoveFromGroup, {
              paymentId,
              removed: true
            })
            handleOnCloseConfirmation()
          } else {
            showError(
              getMessagesFromErrors({
                errors: result?.data?.removePaymentFromPaymentGroup?.errors as {
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
    })
  }

  const handleOnRevertPaymentToPaymentGroup = async ({
    paymentId,
    paymentGroupId
  }: {
    paymentId: string
    paymentGroupId: string
  }) => {
    const number = decodeRawIdAndType(paymentId).id

    try {
      const result = await setRestorePaymentToPaymentGroup({
        variables: {
          input: {
            paymentId,
            paymentGroupId
          }
        }
      })

      if (result?.data?.addPaymentToPaymentGroup?.success) {
        showSuccess(
          translate('modals.revertPaymentToPaymentGroup.notification.success', {
            number
          })
        )
        emitMessage(ApolloContextEvents.paymentAddToGroup, {
          paymentId,
          removed: false
        })
        handleOnCloseConfirmation()
      } else {
        showError(
          getMessagesFromErrors({
            errors: result?.data?.addPaymentToPaymentGroup?.errors as {
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
    handleOnRemovePaymentFromPaymentGroup,
    handleOnRevertPaymentToPaymentGroup
  }
}

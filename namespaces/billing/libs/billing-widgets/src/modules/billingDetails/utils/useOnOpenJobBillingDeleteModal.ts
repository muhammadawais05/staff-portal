import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ErrorResponse } from '@apollo/client/link/error'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  getMessagesFromErrors,
  getMutationErrorMessage
} from '@staff-portal/billing/src/_lib/helpers/apollo'

import { useSetDeleteJobTemplateMutation } from '../data'

export const useOnOpenJobBillingDeleteModal = (jobTemplateId?: string) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])
  const { showError, showSuccess } = useNotifications()
  const {
    handleOnOpenConfirmation,
    handleOnCloseConfirmation,
    handleOnSetConfirmation
  } = useConfirmations()
  const emitMessage = useMessageEmitter()
  const [setDeleteJobTemplateMutation] = useSetDeleteJobTemplateMutation()

  const confirmationConfig = useMemo(
    () => ({
      actionTitle: translate('common:actions.remove'),
      actionVariant: 'negative',
      description: translate('billingDetails:modals.jobTemplateDelete.message'),
      title: translate('billingDetails:modals.jobTemplateDelete.title'),
      onSuccess: async () => {
        try {
          handleOnSetConfirmation({
            actionIsLoading: true
          })
          const result = await setDeleteJobTemplateMutation({
            variables: {
              input: {
                jobTemplateId: jobTemplateId || ''
              }
            }
          })

          if (result?.data?.deleteJobTemplate?.success) {
            showSuccess(
              translate(
                'billingDetails:modals.jobTemplateDelete.notification.success'
              )
            )
            emitMessage(ApolloContextEvents.jobDeleteTemplate)
          } else {
            showError(
              getMessagesFromErrors({
                errors: result?.data?.deleteJobTemplate?.errors
              })
            )
          }
        } catch (error) {
          showError(getMutationErrorMessage(error as ErrorResponse))
        } finally {
          handleOnCloseConfirmation()
        }
      }
    }),
    [
      emitMessage,
      handleOnCloseConfirmation,
      handleOnSetConfirmation,
      jobTemplateId,
      setDeleteJobTemplateMutation,
      showError,
      showSuccess,
      translate
    ]
  )

  return () => handleOnOpenConfirmation(confirmationConfig)
}

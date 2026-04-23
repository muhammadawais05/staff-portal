import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { Config } from '@toptal/picasso-forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ContactCompanyPayload } from '../../../types'
import { SendEmailFormValues } from '../../SendEmailForm'
import { useSendEmail } from '../../SendEmailModal/data/send-email'

const ERROR_MESSAGE = 'Unable to send email.'
const SUCCESS_MESSAGE = 'The email was successfully sent.'
const SEND_TO_ERROR_MESSAGE = 'Cannot find "Send To" option'

const getEmailTemplateId = (template?: string | null) =>
  template ? Number(decodeEntityId(template).id) : null

export const useSendGeneralEmail = (
  onCompleted: (data?: ContactCompanyPayload) => void
) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const { sendEmail } = useSendEmail({
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleSubmit: Config<SendEmailFormValues>['onSubmit'] = async ({
    body,
    ccSuggested,
    ccAdditional,
    template,
    title,
    pendingTasks,
    to
  }) => {
    if (!to) {
      throw new Error(SEND_TO_ERROR_MESSAGE)
    }

    const sendEmailResult = await sendEmail({
      body,
      cc: [...ccSuggested, ...ccAdditional.map(({ value }) => value)],
      emailTemplateId: getEmailTemplateId(template),
      title,
      toId: to,
      taskIds: pendingTasks
    })

    const validationErrors = handleMutationResult({
      mutationResult: sendEmailResult?.data?.sendEmailTo,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        const refetchTasks = pendingTasks.some(Boolean)

        onCompleted({ refetchTasks })
      }
    })

    if (validationErrors) {
      return validationErrors
    }

    if (!sendEmailResult.data?.sendEmailTo?.success) {
      showError(ERROR_MESSAGE)
    }
  }

  return handleSubmit
}

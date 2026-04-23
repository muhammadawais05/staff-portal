import React, { useMemo } from 'react'
import { arrayMutators, Form, Config } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Notification, Typography } from '@toptal/picasso'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { Maybe } from '@staff-portal/graphql/staff'
import {
  SendEmailProvider,
  SendEmailModal as SEM,
  EmailPreview,
  SendEmailFormValues
} from '@staff-portal/communication-send-email'

import {
  EmailApplicantsApplicationFragment,
  EmailMessagingJobApplicantsFragment
} from '../../data/get-email-applicants-recipient/get-email-applicants-recipient.staff.gql.types'
import { useEmailJobApplicants } from '../../data/email-job-applicants/email-job-applicants.staff.gql'
import { parseRawTemplate } from '../../services/parse-raw-template/parse-raw-template'
import { getEmailTemplateId } from '../../services/email-template-id/email-template-id'
import { generateSuccessMessage } from '../../services/generate-success-message/generate-success-message'
import EmailApplicantsInfo from '../EmailApplicantsInfo/EmailApplicantsInfo'
import OfacStatusesNotification from '../OfacStatusesNotification/OfacStatusesNotification'

interface Props {
  recipient: EmailMessagingJobApplicantsFragment
  selectedApplications: EmailApplicantsApplicationFragment[] | undefined
  handleCompleted: () => void
  hideModal: () => void
}

export const getInitialValues = (
  recipient: Maybe<EmailMessagingJobApplicantsFragment> | undefined
) => ({
  title: '',
  bookingObjectId: undefined,
  template: null,
  ccSuggested: [],
  ccAdditional: [],
  to: recipient?.id,
  body: parseRawTemplate(recipient?.blankEmailTemplate?.rawTemplate || '')
})

const SendJobApplicantsEmailForm = ({
  recipient,
  selectedApplications,
  handleCompleted,
  hideModal
}: Props) => {
  const { showError, showCustom } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const ERROR_MESSAGE_SEND_EMAIL = 'Unable to send email.'

  const [sendEmail, { loading }] = useEmailJobApplicants({
    onError: () => showError(ERROR_MESSAGE_SEND_EMAIL)
  })

  const showFailureMessage = (
    failureCount?: number,
    failureMessage?: string[] | null
  ) => {
    const base = `${failureCount || 0} job applicants could not be processed:`

    showCustom(
      <Notification variant='red'>
        <Typography>{base}</Typography>
        {failureMessage?.map(message => (
          <Typography key={message}>{message}</Typography>
        ))}
      </Notification>
    )
  }
  const handleSubmit: Config<SendEmailFormValues>['onSubmit'] =
    async response => {
      const { body, ccSuggested, ccAdditional, template, title, to } = response

      if (!to) {
        throw new Error('Cannot find "Send To" option')
      }

      const sendEmailResult = await sendEmail({
        variables: {
          input: {
            jobApplicationIds:
              selectedApplications?.map(application => application.id) || [],
            body,
            cc: [...ccSuggested, ...ccAdditional.map(({ value }) => value)],
            emailTemplateId: getEmailTemplateId(template),
            title
          }
        }
      })

      const result = sendEmailResult?.data?.emailJobApplicants
      const validationErrors = handleMutationResult({
        mutationResult: result,
        successNotificationMessage: generateSuccessMessage(
          result?.successCount || 0
        ),
        onSuccessAction: () => {
          hideModal()
          handleCompleted()

          if (result?.failureCount) {
            showFailureMessage(result?.failureCount, result?.failureMessage)
          }
        }
      })

      if (validationErrors) {
        return validationErrors
      }
    }

  const initialValues = useMemo(() => getInitialValues(recipient), [recipient])

  return (
    <ModalForm
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
      onSubmit={handleSubmit}
      title='Email Applicants'
    >
      <Modal.Content>
        <SendEmailProvider emailContext={recipient}>
          <EmailApplicantsInfo applicants={selectedApplications} />
          <SEM.EmailTemplatesField autoFocus />
          <SEM.SubjectField label='Title' />
          <SEM.CCSuggestedField />
          <SEM.CCAdditionalField />
          <SEM.EmailBodyField emailPreview={EmailPreview} />
          <OfacStatusesNotification applications={selectedApplications} />
          <SEM.GoogleAppsAuthNotification />
        </SendEmailProvider>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>Send email</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default SendJobApplicantsEmailForm

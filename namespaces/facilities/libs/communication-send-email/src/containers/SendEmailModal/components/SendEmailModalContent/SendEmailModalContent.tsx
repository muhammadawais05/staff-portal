import React, { ReactNode } from 'react'
import { Container } from '@toptal/picasso'
import { Config, Form } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { FormCancelButton } from '@staff-portal/forms'

import { SendEmailProvider } from '../../context/send-email-context'
import { EmailContext } from '../../types'
import SendEmailForm, { SendEmailFormValues } from '../SendEmailForm'
import SendEmailScheduledSubmitButton from '../SendEmailScheduledSubmitButton'

type Props = {
  children: ReactNode
  emailContext: EmailContext
  preselectedEmailTemplateId?: string
  scheduledSend?: boolean
  handleSubmit?: Config<SendEmailFormValues>['onSubmit']
  hideModal: () => void
}

const SendEmailModalContent = ({
  children,
  emailContext,
  preselectedEmailTemplateId,
  scheduledSend,
  handleSubmit = () => {},
  hideModal
}: Props) => {
  const { fullName } = emailContext

  return (
    <SendEmailForm
      title={`New Email to ${fullName}`}
      emailContext={emailContext}
      preselectedEmailTemplateId={preselectedEmailTemplateId}
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        <SendEmailProvider emailContext={emailContext}>
          {children}
        </SendEmailProvider>
      </Modal.Content>
      <Modal.Actions>
        <Container flex justifyContent='flex-end'>
          <FormCancelButton
            onClick={hideModal}
            data-testid='send-email-modal-cancel-button'
          />
          <Container left='small'>
            {scheduledSend ? (
              <SendEmailScheduledSubmitButton />
            ) : (
              <Form.SubmitButton
                variant='positive'
                data-testid='send-email-modal-submit-button'
              >
                Send email
              </Form.SubmitButton>
            )}
          </Container>
        </Container>
      </Modal.Actions>
    </SendEmailForm>
  )
}

export default SendEmailModalContent

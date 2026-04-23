import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { Container, Typography } from '@toptal/picasso'
import { Button } from '@toptal/picasso/Button'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useSendEngagementTalentIntroductionTestEmail } from '../../../../../../data/send-engagement-talent-introduction-test-email/send-engagement-talent-introduction-test-email.staff.gql'

export interface Props {
  engagementId: string
  onClose: () => void
  onCompleted?: () => void
}

const SendTestEmailModal = ({ engagementId, onClose, onCompleted }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [sendTestEmail, { loading }] =
    useSendEngagementTalentIntroductionTestEmail()

  const handleSubmit = async ({ emails }: { emails: [''] }) => {
    const sendEmailResult = await sendTestEmail({
      variables: {
        input: {
          engagementId,
          emails
        }
      }
    })

    if (
      !sendEmailResult.data?.sendEngagementTalentIntroductionTestEmail?.success
    ) {
      showError(
        concatMutationErrors(
          sendEmailResult.data?.sendEngagementTalentIntroductionTestEmail
            ?.errors
        )
      )
    }

    return handleMutationResult({
      mutationResult:
        sendEmailResult?.data?.sendEngagementTalentIntroductionTestEmail,
      successNotificationMessage: 'Email has been sent',
      onSuccessAction: () => {
        onCompleted?.()
      }
    })
  }

  return (
    <Modal withForm onClose={onClose} open size='small'>
      <Form onSubmit={handleSubmit}>
        <Modal.Title>Send Test Email</Modal.Title>

        <Modal.Content>
          <Form.Input required name='emails' label='To' width='full' />
          <Container top='xsmall'>
            <Typography size='xsmall'>
              Use commas to separate email addresses.
            </Typography>
          </Container>
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button loading={loading} variant='positive' type='submit'>
            Send Test
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default SendTestEmailModal

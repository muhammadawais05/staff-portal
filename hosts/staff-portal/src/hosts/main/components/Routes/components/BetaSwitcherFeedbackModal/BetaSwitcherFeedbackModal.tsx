import React from 'react'
import { Button, Alert, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { getUrl } from '@staff-portal/navigation'
import { getLogRocketSessionUrl } from '@staff-portal/monitoring-service'
import { Modal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import BetaSwitcherFeedbackFormContent from '../BetaSwitcherFeedbackFormContent'
import {
  SendBetaFeedbackMutationVariables,
  useSendBetaFeedback
} from './data/send-beta-feedback'

export interface Props {
  onSubmit: () => void
  hideModal: () => void
}

type FormValues = Pick<SendBetaFeedbackMutationVariables, 'reason' | 'comment'>

const BetaSwitcherFeedbackModal = ({ onSubmit, hideModal }: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [sendBetaFeedback, { loading }] = useSendBetaFeedback()

  const handleSubmit = async (formValues: FormValues) => {
    const logRocketSessionUrl = getLogRocketSessionUrl()
    const pageUrl = getUrl()

    const { data } = await sendBetaFeedback({
      variables: { ...formValues, pageUrl, logRocketSessionUrl }
    })

    return handleMutationResult({
      mutationResult: data?.feedbackBeta,
      successNotificationMessage: 'Your feedback was submitted successfully.',
      onSuccessAction: () => {
        onSubmit()
        hideModal()
      }
    })
  }

  return (
    <Modal onClose={hideModal} open size='small'>
      <Form onSubmit={handleSubmit}>
        <Modal.Title>Staff Portal Beta Feedback Survey</Modal.Title>

        <Modal.Content>
          <Container bottom='medium'>
            <Alert>
              The legacy version of this page will be disabled soon. We'd
              appreciate it if you'd share the reason you're switching back to
              the legacy version—your feedback helps us improve the new Staff
              Portal.
            </Alert>
          </Container>

          <BetaSwitcherFeedbackFormContent />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Continue in Staff Portal Beta
          </Button>

          <Form.SubmitButton variant='positive'>
            Return to Previous Version
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default BetaSwitcherFeedbackModal

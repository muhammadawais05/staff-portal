import { Modal } from '@staff-portal/modals-service'
import {
  Alert,
  Button,
  Container,
  Form as PicassoForm,
  Tooltip,
  Typography
} from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { isMaxLength } from '@staff-portal/validators'

import { useEditEngagementCommitment } from './data'
import { ENGAGEMENT_TALENT_UPDATED } from '../../messages'

const OPTIONS = [
  { text: '0', value: 0 },
  { text: '5', value: 5 }
]

interface EditMinCommitmentForm {
  minimumHours: number
  comment: string
}

export interface Props {
  engagementId: string
  minimumHours?: number
  hideModal: () => void
}

const EditMinCommitmentModal = ({
  engagementId,
  minimumHours = 0,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [editEngagementCommitment, { loading }] = useEditEngagementCommitment({
    onError: () =>
      showError('An error occurred, the engagement commitment was not updated.')
  })

  const handleSubmit = async (form: EditMinCommitmentForm) => {
    const { data } = await editEngagementCommitment({
      variables: {
        input: {
          ...form,
          engagementId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.editEngagementCommitment,
      successNotificationMessage:
        'Minimum commitment settings were successfully updated.',
      onSuccessAction: () => {
        emitMessage(ENGAGEMENT_TALENT_UPDATED, { engagementId })
        hideModal()
      }
    })
  }

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      data-testid='edit-min-commitment-modal'
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'editEngagementCommitment'
      }}
    >
      <Modal.Title>Edit Minimum Commitment for Engagement</Modal.Title>

      <Form<EditMinCommitmentForm>
        initialValues={{ minimumHours }}
        onSubmit={handleSubmit}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Alert>
              Note: Changes will take effect for the next billing cycle.
            </Alert>
          </Container>

          <PicassoForm.Field>
            <PicassoForm.Label requiredDecoration='asterisk'>
              Minimum hours
            </PicassoForm.Label>

            <Container flex alignItems='center'>
              <Tooltip content='Minimum Commitment is a fee charged to the client when a billing cycle has less than 5 hrs/week logged for an hourly engagement. It’s different from the Estimated Weekly Hours, which is an estimate for the weekly workload.'>
                <Container right='xsmall'>
                  <Form.Select
                    required
                    name='minimumHours'
                    width='shrink'
                    options={OPTIONS}
                    data-testid='edit-min-commitment-modal-minimum-hours'
                  />
                </Container>
              </Tooltip>

              <Typography size='medium'>hours per week</Typography>
            </Container>
          </PicassoForm.Field>

          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            validate={isMaxLength}
            data-testid='edit-min-commitment-modal-comment'
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='edit-min-commitment-modal-submit-button'
          >
            Update Minimum Commitment
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default EditMinCommitmentModal

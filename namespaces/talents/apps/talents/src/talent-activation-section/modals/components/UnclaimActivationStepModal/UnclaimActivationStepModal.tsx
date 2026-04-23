import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { FormCancelButton } from '@staff-portal/forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useUnassignActivationStep } from './data'

interface FormData {
  comment: string
}

export interface Props {
  stepName: string
  hideModal: () => void
  stepId: string
  talentId: string
}

const UnclaimActivationStepModal = ({
  stepId: activationStepId,
  stepName,
  hideModal,
  talentId
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [unclaimStep, { loading }] = useUnassignActivationStep({
    onError: () => showError('Unable to unclaim step.')
  })
  const handleSubmit = async ({ comment }: FormData) => {
    const { data } = await unclaimStep({
      variables: {
        input: {
          activationStepId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.unassignActivationStep,
      successNotificationMessage: `The ${stepName} Step has been successfully unclaimed.`,
      onSuccessAction: () => {
        hideModal()
        emitMessage(TALENT_UPDATED, { talentId })
      }
    })
  }

  return (
    <Modal onClose={hideModal} open size='small'>
      <ModalForm title={`Unclaim ${stepName}`} onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography>
              Do you really want to unclaim the {stepName} step?
            </Typography>
          </Container>
          <Container bottom='small'>
            <Form.Input
              required
              multiline
              rows={4}
              width='full'
              name='comment'
              label='Comment'
              validate={isMaxLength}
              autoFocus
            />
          </Container>
        </Modal.Content>

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton variant='positive' loading={loading}>
            Unclaim Step
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default UnclaimActivationStepModal

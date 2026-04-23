import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'
import { ResetActivationStepInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useNotifications } from '@toptal/picasso/utils'
import { FormCancelButton } from '@staff-portal/forms'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { useResetActivationStep } from './data'

interface FormData {
  comment: string
}

export interface Props {
  stepName: string
  hideModal: () => void
  stepId: string
  talentId: string
}

const ResetActivationStepModal = ({
  stepId: activationStepId,
  stepName,
  hideModal,
  talentId
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [resetStep, { loading }] = useResetActivationStep({
    onError: () => showError('Unable to reset step.')
  })
  const handleSubmit = async ({ comment }: FormData) => {
    const { data } = await resetStep({
      variables: {
        input: {
          activationStepId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.resetActivationStep,
      successNotificationMessage: `The ${stepName} Step has been successfully reset.`,
      onSuccessAction: () => {
        hideModal()
        emitMessage(TALENT_UPDATED, { talentId })
      }
    })
  }

  return (
    <Modal onClose={hideModal} open size='small'>
      <ModalForm<ResetActivationStepInput>
        initialValues={{ activationStepId }}
        onSubmit={handleSubmit}
        title={`Reset ${stepName}`}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography>
              Do you really want to reset the {stepName} step?
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
          <Form.SubmitButton variant='negative' loading={loading}>
            Reset Step
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ResetActivationStepModal

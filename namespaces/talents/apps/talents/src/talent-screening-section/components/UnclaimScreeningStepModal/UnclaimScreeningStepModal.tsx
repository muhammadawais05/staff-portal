import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { NodeType } from '@staff-portal/graphql'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { useUnclaimScreeningStep } from './data'

const getModalText = ({
  stepName,
  status
}: {
  stepName: string
  status: string
}) => {
  if (status === 'approved') {
    return {
      modalTitle: `Reset ${stepName}`,
      introduction: `Do you really want to reset the ${stepName} step?`,
      submitButton: `Reset ${stepName} Step`,
      successMessage: `The ${stepName} Step was successfully reset.`
    }
  }

  return {
    modalTitle: `Unclaim ${stepName}`,
    introduction: `Do you really want to unclaim the ${stepName} step?`,
    submitButton: `Unclaim ${stepName} Step`,
    successMessage: `The ${stepName} Step was successfully unclaimed.`
  }
}

interface FormData {
  comment: string
}

export interface Props {
  roleStep: Pick<
    ScreeningRoleStepFragment,
    'id' | 'status' | 'step' | 'stepInvolvesMeeting'
  >
  onSuccess?: () => void
  hideModal: () => void
}

const UnclaimScreeningStepModal = ({
  roleStep: {
    id: roleStepId,
    status,
    step: { title },
    stepInvolvesMeeting
  },
  onSuccess,
  hideModal
}: Props) => {
  const { modalTitle, introduction, submitButton, successMessage } =
    getModalText({ stepName: title, status })
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [unclaimStep, { loading }] = useUnclaimScreeningStep({
    onError: () => showError('Unable to unclaim step.')
  })
  const handleSubmit = async ({ comment }: FormData) => {
    const { data } = await unclaimStep({
      variables: {
        roleStepId,
        comment
      }
    })

    return handleMutationResult({
      mutationResult: data?.unclaimRoleStep,
      successNotificationMessage: successMessage,
      onSuccessAction: () => {
        hideModal()
        onSuccess?.()
      }
    })
  }

  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: roleStepId,
        nodeType: NodeType.ROLE_STEP,
        operationName: 'unclaimRoleStep'
      }}
    >
      <ModalForm onSubmit={handleSubmit} title={modalTitle}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>{introduction}</Typography>
          </Container>

          {stepInvolvesMeeting && (
            <Container bottom='medium'>
              <Typography size='medium' weight='semibold'>
                The step unclaiming will cancel the existing interview
                invitation and the new one has to be sent again when the step is
                claimed. Please use step reassign if you want to keep the
                current invitation.
              </Typography>
            </Container>
          )}

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
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='negative' loading={loading}>
            {submitButton}
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default UnclaimScreeningStepModal

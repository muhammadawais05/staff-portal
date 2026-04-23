import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { NodeType } from '@staff-portal/graphql'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { useResetScreeningStep } from './data'

interface FormData {
  comment: string
}
export interface Props {
  roleStep: Pick<ScreeningRoleStepFragment, 'id' | 'step'>
  onSuccess?: () => void
  hideModal: () => void
}

const ResetScreeningStepModal = ({
  roleStep: {
    id: roleStepId,
    step: { title: stepTitle }
  },
  onSuccess,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [resetStep, { loading }] = useResetScreeningStep({
    onError: () => showError('Unable to reset step.')
  })

  const handleSubmit = async ({ comment }: FormData) => {
    const { data } = await resetStep({
      variables: {
        input: { roleStepId, comment }
      }
    })

    return handleMutationResult({
      mutationResult: data?.unapproveRoleStep,
      successNotificationMessage: `The ${stepTitle} step was successfully reset.`,
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
        operationName: 'unapproveRoleStep'
      }}
    >
      <ModalForm onSubmit={handleSubmit} title={`Reset ${stepTitle}`}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Do you really want to reset the {stepTitle} step?
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
            />
          </Container>
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            data-testid='reset-step-submit'
            variant='negative'
            loading={loading}
          >
            Reset Step
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ResetScreeningStepModal

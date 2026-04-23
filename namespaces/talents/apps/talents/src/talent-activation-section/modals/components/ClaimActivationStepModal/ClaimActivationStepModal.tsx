import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { FormCancelButton } from '@staff-portal/forms'

import { useAssignActivationStep } from './data'

export interface Props {
  talentId: string
  staffId: string
  staffFullName: string
  stepName: string
  hideModal: () => void
  stepId: string
  talentFullName: string
}

const ClaimActivationStepModal = ({
  stepId: activationStepId,
  talentId,
  stepName,
  staffId,
  staffFullName,
  talentFullName,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [claimStep, { loading }] = useAssignActivationStep({
    onError: () => showError('Unable to claim step.')
  })
  const handleSubmit = async () => {
    const { data } = await claimStep({
      variables: {
        input: {
          staffId,
          activationStepId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.assignActivationStep,
      successNotificationMessage: `The ${stepName} Step has been successfully claimed and assigned to ${staffFullName}.`,
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      }
    })
  }

  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: activationStepId,
        nodeType: NodeType.ACTIVATION_STEP,
        operationName: 'assign'
      }}
    >
      <ModalForm title={`Claim ${stepName}`} onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography>
              Are you sure you want to claim the {stepName} step for{' '}
              {talentFullName}?
            </Typography>
          </Container>
        </Modal.Content>

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton variant='positive' loading={loading}>
            Claim Step
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ClaimActivationStepModal

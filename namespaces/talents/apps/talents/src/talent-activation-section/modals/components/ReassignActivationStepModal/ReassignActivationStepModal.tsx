import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { FormCancelButton } from '@staff-portal/forms'
import { AssigneeFragment, TALENT_UPDATED } from '@staff-portal/talents'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import StaffAutocomplete from '../StaffAutocomplete'
import { useReassignActivationStep } from './data'

interface FormData {
  comment: string
  staffId: string
}

export interface Props {
  activationId: string
  stepName: string
  hideModal: () => void
  stepId: string
  staff?: AssigneeFragment | null
  talentId: string
}

const ReassignActivationStepModal = ({
  activationId,
  stepId: activationStepId,
  stepName,
  staff,
  hideModal,
  talentId
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [reassignStep, { loading }] = useReassignActivationStep({
    onError: () => showError('Unable to reassign step.')
  })

  const handleSubmit = async ({ comment, staffId }: FormData) => {
    const { data } = await reassignStep({
      variables: {
        input: {
          staffId,
          activationStepId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.reassignActivationStep,
      successNotificationMessage: `The ${stepName} Step has been successfully reassigned.`,
      onSuccessAction: () => {
        hideModal()
        emitMessage(TALENT_UPDATED, { talentId })
      }
    })
  }

  if (!staff) {
    return null
  }

  return (
    <Modal onClose={hideModal} open size='small'>
      <ModalForm
        title={`Reassign ${stepName}`}
        onSubmit={handleSubmit}
        initialValues={{
          staffId: staff.id
        }}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography>
              Do you really want to reassign the {stepName} step?
            </Typography>
          </Container>
          <Container bottom='small'>
            <StaffAutocomplete
              fieldName='staffId'
              activationId={activationId}
              activationStepId={activationStepId}
              initialFullName={staff.fullName}
              required
            />
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
            Reassign Step
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ReassignActivationStepModal

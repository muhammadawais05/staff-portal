import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { ApproveActivationStepInput } from '@staff-portal/graphql/staff'
import { isMaxLength, isValidToptalEmail } from '@staff-portal/validators'
import { TALENT_UPDATED, AssigneeFragment } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@toptal/picasso/utils'
import { FormCancelButton } from '@staff-portal/forms'

import { ApproveActivationStepFormType } from '../../../types'
import { useApproveActivationStep } from './data'

type FormData = Pick<
  ApproveActivationStepInput,
  'comment' | 'reassign' | 'toptalEmail'
>

export interface Props {
  talentId: string
  activationStepId: string
  stepName: string
  otherAssignee?: AssigneeFragment
  needsToptalEmail?: boolean
  hideModal: () => void
}

const ApproveActivationStepModal = ({
  talentId,
  activationStepId,
  stepName,
  otherAssignee,
  needsToptalEmail,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [submitApproveStep, { loading }] = useApproveActivationStep({
    onError: () => showError('Unable to approve step.')
  })

  const handleSubmit = async (formData: FormData) => {
    const { data } = await submitApproveStep({
      variables: { input: { ...formData, activationStepId } }
    })

    return handleMutationResult({
      mutationResult: data?.approveActivationStep,
      successNotificationMessage: `The ${stepName} Step has been successfully approved.`,
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      }
    })
  }

  const initialValues: ApproveActivationStepFormType = {
    comment: '',
    reassign: otherAssignee ? true : undefined,
    toptalEmail: needsToptalEmail ? '' : undefined
  }

  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: activationStepId,
        nodeType: NodeType.ACTIVATION_STEP,
        operationName: 'approve'
      }}
    >
      <ModalForm<ApproveActivationStepFormType>
        title={`Approve ${stepName}`}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Modal.Content>
          <Container bottom='small'>
            <Typography>
              Do you really want to approve the {stepName} step?
            </Typography>
          </Container>
          {needsToptalEmail && (
            <Container bottom='small'>
              <Form.Input
                required
                rows={4}
                width='full'
                name='toptalEmail'
                label='Toptal email'
                validate={isValidToptalEmail}
              />
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
              autoFocus={!needsToptalEmail}
            />
          </Container>
          {otherAssignee && (
            <Container>
              <Form.Checkbox
                name='reassign'
                label={`Reassign this step from ${otherAssignee.fullName} on me`}
                titleCase={false}
              />
            </Container>
          )}
        </Modal.Content>

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton variant='positive' loading={loading}>
            Approve Step
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ApproveActivationStepModal

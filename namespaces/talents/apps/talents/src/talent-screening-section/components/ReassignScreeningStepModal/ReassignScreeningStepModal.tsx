import React, { useState } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { ClaimerFragment } from '@staff-portal/facilities'
import { NodeType } from '@staff-portal/graphql'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { useReassignScreeningStep } from './data'
import { StepClaimerSelect } from '../StepClaimerSelect'
import { getClaimerName } from '../../utils'
import { useGetStepClaimers } from '../StepClaimerSelect/data'

interface FormData {
  claimerId: string
  comment: string
}
export interface Props {
  roleStep: Pick<ScreeningRoleStepFragment, 'id' | 'step'>
  onSuccess?: () => void
  hideModal: () => void
}

const ReassignScreeningStepModal = ({
  roleStep: {
    id: roleStepId,
    step: { title: stepTitle }
  },
  onSuccess,
  hideModal
}: Props) => {
  const { claimers, loading: claimersLoading } = useGetStepClaimers(roleStepId)

  const currentUser = useGetCurrentUser()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [selectedClaimer, setSelectedClaimer] = useState<
    ClaimerFragment | undefined
  >()

  const [reassignStep, { loading }] = useReassignScreeningStep({
    onError: () => showError('Unable to reassign step.')
  })

  const handleSubmit = async (values: FormData) => {
    const { data } = await reassignStep({
      variables: {
        input: {
          roleStepId,
          ...values
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.reassignRoleStep,
      successNotificationMessage: `The ${stepTitle} step was successfully reassigned to ${getClaimerName(
        currentUser,
        selectedClaimer
      )}.`,
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
        operationName: 'reassignRoleStep'
      }}
    >
      {claimersLoading ? (
        <ModalSuspender />
      ) : (
        <ModalForm onSubmit={handleSubmit} title={`Reassign ${stepTitle}`}>
          <Modal.Content>
            <Container bottom='medium'>
              <Typography size='medium'>
                Do you really want to reassign the {stepTitle} step?
              </Typography>
            </Container>

            <Container bottom='small'>
              <StepClaimerSelect
                claimers={claimers}
                value={currentUser?.id}
                setSelectedClaimer={setSelectedClaimer}
                name='claimerId'
                label='Claimer'
                width='full'
                autoFocus
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
                data-testid='reassign-step-comment'
              />
            </Container>
          </Modal.Content>

          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton
              data-testid='reassign-step-submit'
              variant='negative'
              loading={loading}
            >
              Reassign Step
            </Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default ReassignScreeningStepModal

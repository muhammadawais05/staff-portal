import React, { useCallback } from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { RoleStepNextActionFragment } from '../../../../data/role-step-next-action-fragment'
import { ReassignScreeningStepCheckbox } from '../../../ReassignScreeningStepCheckbox'
import AllocatedHoursInput from './components/AllocatedHoursInput/AllocatedHoursInput'
import {
  ApproveWorkHoursStepDocument,
  ApproveWorkHoursStepMutation
} from './data/approve-work-hours-step/approve-work-hours-step.staff.gql.types'
import { GetApproveWorkHoursDataQuery } from '../ApproveWorkHoursStepModalContent/data/get-approve-work-hours-data/get-approve-work-hours-data.staff.gql.types'

interface FormData {
  comment: string
  allocatedHours: string
  reassign?: boolean
}

export interface Props {
  roleStep: NonNullable<GetApproveWorkHoursDataQuery['node']>
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveWorkHoursStepModalForm = ({
  roleStep: {
    id: roleStepId,
    claimer,
    step: { title }
  },
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: ApproveWorkHoursStepDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: `The ${title} Step was successfully approved.`,
        onSuccessAction: mutationResult => {
          hideModal()
          onSuccess?.(
            mutationResult as NonNullable<
              ApproveWorkHoursStepMutation['approveWorkHoursRoleStep']
            >
          )
        },
        successMessageEmitOptions: {
          type: TALENT_UPDATED,
          payload: { talentId }
        }
      }
    })

  const handleSubmit = useCallback(
    async ({ allocatedHours, reassign, comment }: FormData) =>
      handleMutationSubmit({
        allocatedHours: Number(allocatedHours),
        comment,
        reassign,
        roleStepId
      }),
    [roleStepId, handleMutationSubmit]
  )

  return (
    <ModalForm<FormData> onSubmit={handleSubmit} title={`Approve ${title}`}>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to approve the {title} step?
          </Typography>
        </Container>

        <AllocatedHoursInput />

        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          label='Comment'
          validate={isMaxLength}
        />

        <ReassignScreeningStepCheckbox
          claimer={claimer}
          roleStepId={roleStepId}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          loading={loading}
          data-testid='approve-work-hours-modal-form-submit-button'
        >
          Approve Step
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ApproveWorkHoursStepModalForm

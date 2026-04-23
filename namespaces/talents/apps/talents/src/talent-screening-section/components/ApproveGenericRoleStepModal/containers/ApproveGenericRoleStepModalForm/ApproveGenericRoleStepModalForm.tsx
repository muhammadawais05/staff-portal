import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useCallback } from 'react'
import {
  MutationResult,
  useModalFormChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { RoleStepNextActionFragment } from '../../../../data'
import { ReassignScreeningStepCheckbox } from '../../../ReassignScreeningStepCheckbox'
import { APPROVE_MUTATION_DOCUMENT_MAPPING } from '../../configs'
import { ApproveGenericRoleStepFragment } from '../../data/get-approve-generic-role-step-data/get-approve-generic-role-step-data.staff.gql.types'
import { ApproveGenericMainActions } from '../../types'
import { ApprovePortfolioRoleStepMutation } from '../../data/approve-portfolio-role-step/approve-portfolio-role-step.staff.gql.types'
import { ApproveTechnicalOneRoleStepMutation } from '../../data/approve-technical-one-role-step/approve-technical-one-role-step.staff.gql.types'
import { ApproveTechnicalTwoRoleStepMutation } from '../../data/approve-technical-two-role-step/approve-technical-two-role-step.staff.gql.types'

interface FormData {
  comment: string
  reassign?: boolean
}

export interface Props {
  actionName: ApproveGenericMainActions
  roleStep: ApproveGenericRoleStepFragment
  onSuccess: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveGenericRoleStepModalForm = ({
  actionName,
  roleStep,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const {
    id: roleStepId,
    claimer,
    step: { title: stepTitle }
  } = roleStep

  const mutationDocument = APPROVE_MUTATION_DOCUMENT_MAPPING[actionName]

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler<
      | ApprovePortfolioRoleStepMutation
      | ApproveTechnicalOneRoleStepMutation
      | ApproveTechnicalTwoRoleStepMutation,
      MutationResult & RoleStepNextActionFragment
    >({
      mutationDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: `The ${stepTitle} Step was successfully approved.`,
        onSuccessAction: mutationResult => {
          hideModal()
          onSuccess?.(mutationResult)
        },
        successMessageEmitOptions: {
          type: TALENT_UPDATED,
          payload: { talentId }
        }
      }
    })

  const handleSubmit = useCallback(
    async ({ comment, reassign }: FormData) =>
      handleMutationSubmit({
        roleStepId,
        comment,
        reassign
      }),
    [roleStepId, handleMutationSubmit]
  )

  return (
    <ModalForm<FormData> title={`Approve ${stepTitle}`} onSubmit={handleSubmit}>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to approve the {stepTitle} step?
          </Typography>
        </Container>

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

        <ReassignScreeningStepCheckbox
          claimer={claimer}
          roleStepId={roleStepId}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive' loading={loading}>
          Approve Step
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ApproveGenericRoleStepModalForm

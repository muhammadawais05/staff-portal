import React, { useRef, useCallback } from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, ReferralBonus16, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@toptal/picasso/utils'
import { DecimalNumberInput } from '@staff-portal/forms'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  MutationResult,
  useModalFormChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { ClaimerFragment } from '@staff-portal/facilities'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { RoleStepNextActionFragment } from '../../../../data/role-step-next-action-fragment'
import {
  ApprovePaymentRoleStepMutation,
  ApprovePaymentRoleStepDocument
} from './data/approve-payment-role-step/approve-payment-role-step.staff.gql.types'

interface FormData {
  comment: string
  hourlyRate: string
  reassign?: boolean
}

export interface Props {
  roleStepId: string
  claimer: Maybe<ClaimerFragment>
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApprovePaymentStepModalForm = ({
  roleStepId,
  claimer,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const currentUser = useGetCurrentUser()

  const initialValues = useRef<FormData>({
    comment: '',
    hourlyRate: '',
    reassign: claimer?.id !== currentUser?.id ? true : undefined
  })

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler<
      ApprovePaymentRoleStepMutation,
      MutationResult & RoleStepNextActionFragment
    >({
      mutationDocument: ApprovePaymentRoleStepDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage:
          'The Payment Details Step was successfully approved.',
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
    async ({ ...restForm }: FormData) =>
      handleMutationSubmit({
        ...restForm,
        roleStepId
      }),
    [roleStepId, handleMutationSubmit]
  )

  return (
    <ModalForm<FormData>
      initialValues={initialValues.current}
      onSubmit={handleSubmit}
      title='Approve Payment Details'
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to approve the Payment Details step?
          </Typography>
        </Container>

        <DecimalNumberInput
          autoFocus
          required
          width='full'
          name='hourlyRate'
          label='Hourly rate'
          icon={<ReferralBonus16 />}
        />

        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          label='Comment'
          validate={isMaxLength}
        />

        {claimer && claimer.id !== currentUser?.id && (
          <Form.Checkbox
            name='reassign'
            label={`Reassign this step from ${claimer.fullName} on me.`}
            titleCase={false}
            data-testid='approve-reassign-checkbox'
          />
        )}
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

export default ApprovePaymentStepModalForm

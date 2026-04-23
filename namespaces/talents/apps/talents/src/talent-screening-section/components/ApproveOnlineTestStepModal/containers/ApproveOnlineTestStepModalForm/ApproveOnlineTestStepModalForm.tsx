import React, { useCallback } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { isMaxLength } from '@staff-portal/validators'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { ReassignScreeningStepCheckbox } from '../../../ReassignScreeningStepCheckbox'
import CompletedOnlineTest from '../../components/CompletedOnlineTest/CompletedOnlineTest'
import PendingOnlineTest from '../../components/PendingOnlineTest/PendingOnlineTest'
import { GetApproveOnlineTestDataQuery } from '../../data/get-approve-online-test-data/get-approve-online-test-data.staff.gql.types'
import {
  ApproveOnlineTestStepDocument,
  ApproveOnlineTestStepMutation
} from '../../data/approve-online-test-step/approve-online-test-step.staff.gql.types'
import { RoleStepNextActionFragment } from '../../../../data/role-step-next-action-fragment'

interface FormData {
  comment: string
  reassign?: boolean
}

export interface Props {
  roleStep: NonNullable<GetApproveOnlineTestDataQuery['node']>
  onSuccess?: (nextAction: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveOnlineTestStepModalForm = ({
  roleStep: {
    id: roleStepId,
    claimer,
    onlineTestAttempt,
    step: { title }
  },
  hideModal,
  onSuccess,
  talentId
}: Props) => {
  const pureScore = onlineTestAttempt?.pureScore
  const hasScore = onlineTestAttempt && typeof pureScore === 'number'

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: ApproveOnlineTestStepDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: `The ${title} Step was successfully approved.`,
        onSuccessAction: mutationResult => {
          hideModal()
          onSuccess?.(
            mutationResult as NonNullable<
              ApproveOnlineTestStepMutation['approveOnlineTestRoleStep']
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
    async (formData: FormData) =>
      handleMutationSubmit({
        roleStepId,
        comment: formData.comment,
        reassign: formData.reassign
      }),
    [roleStepId, handleMutationSubmit]
  )

  return (
    <ModalForm<FormData> onSubmit={handleSubmit} title={`Approve ${title}`}>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            {hasScore ? (
              <CompletedOnlineTest
                stepTitle={title}
                testName={onlineTestAttempt.test?.name}
                finishedAt={onlineTestAttempt.finishedAt}
                pureScore={pureScore}
                maxScore={onlineTestAttempt.maxScore}
                rejectThreshold={onlineTestAttempt.test?.rejectThreshold}
                acceptThreshold={onlineTestAttempt.test?.acceptThreshold}
              />
            ) : (
              <PendingOnlineTest
                stepTitle={title}
                testName={onlineTestAttempt?.test?.name}
                createdAt={onlineTestAttempt?.createdAt}
              />
            )}
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
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='approve-online-test-submit-btn'
        >
          Approve Step
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ApproveOnlineTestStepModalForm

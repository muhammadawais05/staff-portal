import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useCallback } from 'react'
import {
  FeedbackReasonActions,
  BlackFlagClientInput
} from '@staff-portal/graphql/staff'
import { isMaxLength } from '@staff-portal/validators'
import { FormReasonSelect } from '@staff-portal/feedbacks'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { CLIENT_UPDATED } from '../../../../messages'
import { BlackFlagClientDocument } from './data'

interface Props {
  clientId: string
  clientName: string
  isDepositRefundAllowed: boolean
  hideModal: () => void
}

const BlackFlagModalForm = ({
  clientId,
  clientName,
  isDepositRefundAllowed,
  hideModal
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: BlackFlagClientDocument,
      mutationResultOptions: {
        onSuccessAction: hideModal,
        successNotificationMessage: 'Company has been black flagged.',
        successMessageEmitOptions: {
          type: CLIENT_UPDATED,
          payload: { companyId: clientId }
        }
      }
    })

  const handleSubmit = useCallback(
    ({ comment, reasonId, refundDeposit }) =>
      handleMutationSubmit({
        clientId,
        comment,
        reasonId,
        refundDeposit
      }),
    [clientId, handleMutationSubmit]
  )

  return (
    <ModalForm<BlackFlagClientInput>
      onSubmit={handleSubmit}
      title={`Black Flag Company ${clientName}`}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to black flag this company?
          </Typography>

          {isDepositRefundAllowed && (
            <Typography size='medium'>
              Pending job(s) for this company will be deleted, but the deposit
              will be kept unless explicitly refunded.
            </Typography>
          )}
        </Container>

        <FormReasonSelect
          required
          width='full'
          name='reasonId'
          label='Reason'
          action={FeedbackReasonActions.COMPANY_BLACK_FLAGGED}
        />

        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          label='Details'
          validate={isMaxLength}
        />

        {isDepositRefundAllowed && (
          <Form.Checkbox
            defaultChecked={false}
            name='refundDeposit'
            label='Initiate deposit refund (creates a task for the accountant)'
          />
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>Black Flag</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default BlackFlagModalForm

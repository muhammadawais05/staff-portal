import React from 'react'
import { Modal, Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { ConfirmClientTransferRoleRequestInput } from '@staff-portal/graphql/staff'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { ConfirmClientTransferRoleRequestDocument } from './data'
import { MODAL_TITLE } from '../ConfirmTransferRequestModal'

type Props = {
  hideModal: () => void
  requestedTransferId: string
  transferRequestid: string
  companyId: string
  options: { text: string; value: string }[]
}

const ConfirmTransferRequestForm = ({
  hideModal,
  requestedTransferId,
  transferRequestid,
  companyId,
  options
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: ConfirmClientTransferRoleRequestDocument,
    mutationResultOptions: {
      successNotificationMessage: 'Transfer request was confirmed.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(CLIENT_UPDATED, { companyId })
      }
    }
  })

  const initialconfirmedTransferId =
    options.find(item => item.value === requestedTransferId)?.value ??
    options[0].value

  return (
    <ModalForm<ConfirmClientTransferRoleRequestInput>
      initialValues={{
        clientTransferRoleRequestId: transferRequestid,
        confirmedTransferId: initialconfirmedTransferId
      }}
      onSubmit={handleSubmit}
      title={MODAL_TITLE}
    >
      <Modal.Content>
        <Form.Select
          label='Confirmed transfer'
          name='confirmedTransferId'
          width='full'
          options={options}
          data-testid='ConfirmTransferRequestModal-select'
        />
        <Form.Input
          label='Comment'
          name='comment'
          required
          width='full'
          multiline
          rows={4}
          data-testid='ConfirmTransferRequestModal-comment'
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='ConfirmTransferRequestModal-submit'
        >
          Confirm
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ConfirmTransferRequestForm

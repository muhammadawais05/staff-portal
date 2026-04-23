import React, { useCallback } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { RejectClientTransferRoleRequestDocument } from './data'

type Props = {
  hideModal: () => void
  transferRequestId: string
  companyId: string
}

const RejectTransferRequestModal = ({
  hideModal,
  transferRequestId,
  companyId
}: Props) => {
  const emitMessage = useMessageEmitter()

  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: RejectClientTransferRoleRequestDocument,
    mutationResultOptions: {
      successNotificationMessage: 'Transfer request was rejected.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(CLIENT_UPDATED, { companyId })
      }
    }
  })

  const handleModalSubmit = useCallback(
    (value?: string) =>
      handleSubmit({
        clientTransferRoleRequestId: transferRequestId,
        comment: value ?? ''
      }),
    [transferRequestId, handleSubmit]
  )

  return (
    <ConfirmationModal
      open
      required
      size='small'
      variant='negative'
      submitText='Reject'
      placeholder='Please specify a reason.'
      title='Reject Transfer Request'
      loading={loading}
      onClose={hideModal}
      onSubmit={handleModalSubmit}
      operationVariables={{
        nodeId: transferRequestId,
        nodeType: NodeType.CLIENT_TRANSFER_ROLE_REQUEST,
        operationName: 'rejectClientTransferRoleRequest'
      }}
    />
  )
}

export default RejectTransferRequestModal

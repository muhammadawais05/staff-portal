import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { SuspendNegotiationDocument } from './data'

export interface Props {
  companyName: string
  negotiationId: string
  hideModal: () => void
}

const SuspendNegotiationModal = ({
  companyName,
  negotiationId,
  hideModal
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: SuspendNegotiationDocument,
    mutationResultOptions: {
      mutationResult: 'suspendNegotiation',
      successNotificationMessage:
        'The Negotiations were successfully suspended.',
      onSuccessAction: hideModal
    }
  })

  const onSubmit = (value?: string) => {
    return handleSubmit({
      comment: value || '',
      negotiationId: negotiationId || ''
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      variant='negative'
      required
      textFieldName='comment'
      label='Comment'
      placeholder='Pleace specify a reason'
      title={`Suspend Current Negotiation with ${companyName}`}
      submitText='Suspend'
      onSubmit={onSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: negotiationId,
        nodeType: NodeType.NEGOTIATION,
        operationName: 'suspendNegotiation'
      }}
    />
  )
}

export default SuspendNegotiationModal

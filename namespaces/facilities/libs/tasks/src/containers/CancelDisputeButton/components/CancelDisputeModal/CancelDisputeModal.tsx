import React, { useCallback } from 'react'
import { NodeType } from '@staff-portal/graphql'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { CancelTaskDisputeDocument } from './data/cancel-task-dispute/cancel-task-dispute.staff.gql.types'

export interface Props {
  taskId: string
  onCancelDispute: () => void
  hideModal: () => void
}

const CancelDisputeModal = ({ taskId, onCancelDispute, hideModal }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: CancelTaskDisputeDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Success! The task dispute was cancelled.',
        onSuccessAction: () => {
          hideModal()
          onCancelDispute()
        }
      }
    })

  const handleSubmit = useCallback(
    (comment?: string) =>
      handleMutationSubmit({
        taskId,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, taskId]
  )

  return (
    <ConfirmationModal
      operationVariables={{
        nodeId: taskId,
        nodeType: NodeType.TASK,
        operationName: 'cancelTaskDispute'
      }}
      variant='negative'
      required
      label='Comment'
      title='Cancel Dispute'
      message='Are you sure you want to cancel the task dispute?'
      submitText='Cancel Dispute'
      onSubmit={handleSubmit}
      onClose={hideModal}
      loading={loading}
    />
  )
}

export default CancelDisputeModal

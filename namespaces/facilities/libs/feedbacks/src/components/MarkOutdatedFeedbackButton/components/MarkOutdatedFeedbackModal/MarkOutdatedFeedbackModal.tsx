import React, { useCallback } from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { MarkOutdatedFeedbackDocument } from './data'

export interface Props {
  feedbackId: string
  onCompleted: () => void
  hideModal: () => void
}

const MarkOutdatedFeedbackModal = ({
  feedbackId,
  onCompleted,
  hideModal
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading: markOutdatedLoading } =
    useModalFormChangeHandler({
      mutationDocument: MarkOutdatedFeedbackDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: `The Feedback was successfully marked 'outdated'.`,
        onSuccessAction: () => {
          hideModal()
          onCompleted()
        }
      }
    })

  const handleSubmit = useCallback(
    (comment?: string) =>
      handleMutationSubmit({
        feedbackId,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, feedbackId]
  )

  return (
    <ConfirmationModal
      open
      loading={markOutdatedLoading}
      variant='negative'
      required
      textFieldName='comment'
      label='Comment'
      title='Mark Feedback as Outdated'
      submitText='Mark Outdated'
      message='Are you sure that you want to mark this feedback outdated?'
      onSubmit={handleSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: feedbackId,
        nodeType: NodeType.FEEDBACK,
        operationName: 'markOutdatedFeedback'
      }}
    />
  )
}

export default MarkOutdatedFeedbackModal

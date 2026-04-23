import React, { useCallback } from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { RestoreCancelledEngagementDocument } from './data'
import { ENGAGEMENT_UPDATED } from '../../messages'

type Props = {
  engagementId: string
  hideModal: () => void
}

const RestoreCancelledEngagementModal = ({
  engagementId,
  hideModal
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: RestoreCancelledEngagementDocument,
      mutationResultOptions: {
        successMessageEmitOptions: {
          type: ENGAGEMENT_UPDATED,
          payload: { engagementId }
        },
        isFormSubmit: true,
        successNotificationMessage: 'The Interview was successfully restored.',
        onSuccessAction: () => {
          hideModal()
        }
      }
    })

  const handleSubmit = useCallback(
    (comment?: string) =>
      handleMutationSubmit({
        engagementId,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, engagementId]
  )

  return (
    <ConfirmationModal
      variant='positive'
      required
      label='Comment'
      title='Restore Cancelled Interview'
      message='Are you sure you want to restore this interview? Company will start the interview process from the beginning.'
      submitText='Restore Interview'
      textFieldName='comment'
      onSubmit={handleSubmit}
      onClose={hideModal}
      loading={loading}
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'restoreCancelledEngagement'
      }}
    />
  )
}

export default RestoreCancelledEngagementModal

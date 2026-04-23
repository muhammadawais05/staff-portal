import { PromptModal } from '@staff-portal/modals-service'
import React, { useCallback } from 'react'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { ExpireEngagementDocument } from './data/expire-engagement'
import { ENGAGEMENT_UPDATED } from '../../messages'

type Props = {
  engagementId: string
  hideModal: () => void
}

const ExpireEngagementModal = ({ engagementId, hideModal }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: ExpireEngagementDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Interview was marked as expired.',
        successMessageEmitOptions: {
          type: ENGAGEMENT_UPDATED,
          payload: { engagementId }
        },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    () => handleMutationSubmit({ engagementId }),
    [handleMutationSubmit, engagementId]
  )

  return (
    <PromptModal
      open
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'expireEngagement'
      }}
      onClose={hideModal}
      loading={loading}
      title='Expire Interview'
      message='Are you sure you want to expire this interview now?'
      submitText='Expire Interview'
      variant='negative'
      onSubmit={handleSubmit}
      data-testid='ExpireEngagementModal'
    />
  )
}

export default ExpireEngagementModal

import { PromptModal } from '@staff-portal/modals-service'
import React, { useCallback } from 'react'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { NodeType } from '@staff-portal/graphql'

import { ApproveDraftEngagementDocument } from './data/approve-draft-engagement/approve-draft-engagement.staff.gql.types'

export interface Props {
  engagementId: string
  hideModal: () => void
}

const ApproveDraftEngagementModal = ({ engagementId, hideModal }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: ApproveDraftEngagementDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Talent has been approved.',
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
      loading={loading}
      variant='positive'
      title='Approve Draft'
      message='Are you sure you want to approve this engagement?'
      submitText='Approve Draft'
      onSubmit={handleSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'approveDraftEngagement'
      }}
    />
  )
}

export default ApproveDraftEngagementModal

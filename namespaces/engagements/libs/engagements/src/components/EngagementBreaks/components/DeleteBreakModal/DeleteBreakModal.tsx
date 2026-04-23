import React, { useCallback } from 'react'
import { PromptModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { RemoveEngagementBreakDocument } from './data/remove-engagement-break/remove-engagement-break.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../../../messages'

type Props = {
  engagementId: string
  engagementBreakId: string
  hideModal: () => void
}

const DeleteBreakModal = ({
  engagementId,
  engagementBreakId,
  hideModal
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: RemoveEngagementBreakDocument,
      mutationResultOptions: {
        successNotificationMessage:
          'The Engagement Break was successfully deleted!',
        successMessageEmitOptions: {
          type: ENGAGEMENT_UPDATED,
          payload: { engagementId }
        },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    () => handleMutationSubmit({ engagementBreakId }),
    [handleMutationSubmit, engagementBreakId]
  )

  return (
    <PromptModal
      open
      operationVariables={{
        nodeId: engagementBreakId,
        nodeType: NodeType.ENGAGEMENT_BREAK,
        operationName: 'removeEngagementBreak'
      }}
      title='Delete Break'
      message={`Are you sure you want to cancel pause for this engagement? If the client's break affects billing cycles that have already been paid, all related invoices, payments, and commissions will be sent to the accounting team for review and updated accordingly.`}
      submitText='Delete Break'
      variant='negative'
      onClose={hideModal}
      onSubmit={handleSubmit}
      loading={loading}
      data-testid='DeleteBreak-modal'
    />
  )
}

export default DeleteBreakModal

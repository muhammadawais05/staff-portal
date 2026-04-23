import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { useRestoreRejectedEngagement } from './data'
import { ENGAGEMENT_UPDATED } from '../../messages'

export interface Props {
  engagementId: string
  hideModal: () => void
}

const RestoreRejectedEngagementModal = ({ engagementId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [restoreRejectedEngagement, { loading }] = useRestoreRejectedEngagement(
    {
      onError: () =>
        showError('An error occurred, the Interview was not restored.')
    }
  )

  const handleSubmit = async (comment = '') => {
    const { data } = await restoreRejectedEngagement({
      variables: {
        input: {
          engagementId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.restoreRejectedEngagement,
      successNotificationMessage: 'The Interview was successfully restored.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
      }
    })
  }

  return (
    <ConfirmationModal
      required
      loading={loading}
      variant='positive'
      label='Comment'
      title='Restore Rejected Interview'
      placeholder='Please specify a reason.'
      message='Are you sure you want to restore this interview? Company will start the interview process from the beginning.'
      submitText='Restore Interview'
      onSubmit={handleSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'restoreRejectedEngagement'
      }}
    />
  )
}

export default RestoreRejectedEngagementModal

import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { PromptModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { ReopenExpiredEngagementDocument } from './data/reopen-engagement-and-approve-trial/reopen-engagement-and-approve-trial.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../messages'

type Props = {
  engagementId: string
  hideModal: () => void
}

const ReopenEngagementAndApproveTrialModal = ({
  hideModal,
  engagementId
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [reopenExpiredEngagement, { loading }] = useMutation(
    ReopenExpiredEngagementDocument,
    {
      onError: () =>
        showError("An error occurred, the engagement can't be reopened.")
    }
  )

  const handleSubmit = async () => {
    const { data } = await reopenExpiredEngagement({
      variables: { input: { engagementId } }
    })

    return handleMutationResult({
      mutationResult: data?.reopenExpiredEngagement,
      successNotificationMessage: 'The engagement was successfully reopened.',
      onSuccessAction: () => {
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        hideModal()
      }
    })
  }

  return (
    <PromptModal
      open
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'reopenExpiredEngagement'
      }}
      title='Reopen Engagement'
      message='Are you sure that you want to reopen this engagement? This will set change trial to approved, and billing will be generated without breaks. If there was a break, you can add it after reopening.'
      submitText='Reopen and Approve Trial'
      onSubmit={handleSubmit}
      onClose={hideModal}
      loading={loading}
      data-testid='ReopenEngagementAndApproveTrialModal'
    />
  )
}

export default ReopenEngagementAndApproveTrialModal

import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { PromptModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { ApproveEngagementTrialDocument } from './data/approve-trial-engagement/approve-trial-engagement.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../messages'

type Props = {
  engagementId: string
  clientId?: Maybe<string>
  talentType?: string
  hideModal: () => void
}

const ApproveEngagementTrialModal = ({
  engagementId,
  talentType,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [approveTrialEngagement, { loading }] = useMutation(
    ApproveEngagementTrialDocument,
    {
      onError: () => showError("An error occurred, trial can't be approved.")
    }
  )

  const handleSubmit = async () => {
    const { data } = await approveTrialEngagement({
      variables: { input: { engagementId } }
    })

    return handleMutationResult({
      mutationResult: data?.approveEngagementTrial,
      successNotificationMessage: `${talentType} was successfully hired.`,
      onSuccessAction: () => {
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        hideModal()
      }
    })
  }

  if (!talentType) {
    return null
  }

  return (
    <PromptModal
      open
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'approveEngagementTrial'
      }}
      title={`Approve ${talentType} Trial`}
      message={`Are you sure that you want to approve trial and hire ${talentType.toLowerCase()}? This will immediately end the trial period (if it's not finished yet) and start your working contract with the ${talentType.toLowerCase()}.`}
      submitText={`Hire ${talentType}`}
      loading={loading}
      onSubmit={handleSubmit}
      onClose={hideModal}
      data-testid='ApproveTrialModal'
    />
  )
}

export default ApproveEngagementTrialModal

import React from 'react'

import BaseRejectEngagementTrialModal from '../BaseRejectEngagementTrialModal'

type Props = {
  hideModal: () => void
  engagementId: string
  talentType?: string
}

const RejectEngagementTrialModal = ({
  hideModal,
  engagementId,
  talentType
}: Props) => (
  <BaseRejectEngagementTrialModal
    hideModal={hideModal}
    engagementId={engagementId}
    talentType={talentType}
    mutationName='rejectEngagementTrial'
  />
)

export default RejectEngagementTrialModal

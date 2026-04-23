import React from 'react'

import ReasonModal from '../ReasonModal'

export interface Props {
  engagementId: string
  hideModal: () => void
}

const RejectDraftEngagementModal = ({
  engagementId,
  hideModal
}: Props) => {
  return <ReasonModal
    hideModal={hideModal}
    engagementId={engagementId}
    title='Reject Talent Introduction'
    submitLabel='Reject'
    errorMessage='An error occurred, unable to reject.'
    successNotificationMessage='Talent has been rejected.'
    mutationName='rejectDraftEngagement'
  />
}

export default RejectDraftEngagementModal

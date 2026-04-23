import React from 'react'

import ReasonModal from '../ReasonModal'

type Props = {
  hideModal: () => void
  engagementId: string
}

const CancelEngagementDraftModal = ({ hideModal, engagementId }: Props) => {
  return (
    <ReasonModal
      hideModal={hideModal}
      engagementId={engagementId}
      title='Cancel Draft'
      description='Are you sure you want to cancel this draft? Cancelling the draft will also cancel the associated internal interview (if any).'
      submitLabel='Cancel Draft'
      errorMessage='An error occurred, Interview was not canceled.'
      successNotificationMessage='Draft was canceled.'
      mutationName='cancelEngagementDraftInInterview'
    />
  )
}

export default CancelEngagementDraftModal

import React from 'react'

import ReasonModal from '../ReasonModal'

type Props = {
  hideModal: () => void
  engagementId: string
}

const CancelInterviewModal = ({ hideModal, engagementId }: Props) => (
  <ReasonModal
    hideModal={hideModal}
    engagementId={engagementId}
    title='Cancel Interview'
    description='Are you sure you want to cancel this interview?'
    submitLabel='Cancel Interview'
    errorMessage='An error occurred, Interview was not canceled.'
    successNotificationMessage='Interview was canceled.'
    mutationName='cancelEngagementInInterview'
  />
)

export default CancelInterviewModal

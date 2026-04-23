import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'

import SendJobApplicantsEmailForm from './components/SendJobApplicantsEmailForm/SendJobApplicantsEmailForm'
import { useGetEmailApplicantsRecipient } from './data/get-email-applicants-recipient/get-email-applicants-recipient.staff.gql'

interface Props {
  jobId: string
  jobApplicationIds: string[]
  hideModal: () => void
}

const SendJobApplicantsEmailModalContent = ({
  jobId,
  jobApplicationIds,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const ERROR_MESSAGE_RECIPIENT = 'Unable to get the email recipient.'

  const {
    recipient,
    applications,
    refetchRecipient,
    loading: loadingRecipient
  } = useGetEmailApplicantsRecipient({
    jobId,
    onError: () => showError(ERROR_MESSAGE_RECIPIENT),
    onCompleted: success => {
      if (!success) {
        showError(ERROR_MESSAGE_RECIPIENT)

        return
      }
    }
  })

  const handleCompleted = () => {
    refetchRecipient()
  }

  const selectedApplications = applications?.nodes?.filter(application =>
    jobApplicationIds.includes(application.id)
  )

  if (loadingRecipient) {
    return <ModalSuspender />
  }
  if (!recipient) {
    return null
  }

  return (
    <SendJobApplicantsEmailForm
      recipient={recipient}
      hideModal={hideModal}
      handleCompleted={handleCompleted}
      selectedApplications={selectedApplications}
    />
  )
}

const SendJobApplicantsEmailModal = ({
  jobId,
  jobApplicationIds,
  hideModal
}: Props) => {
  return (
    <Modal onClose={hideModal} open size='large'>
      <SendJobApplicantsEmailModalContent
        jobId={jobId}
        jobApplicationIds={jobApplicationIds}
        hideModal={hideModal}
      />
    </Modal>
  )
}

export default SendJobApplicantsEmailModal

import { useModal } from '@staff-portal/modals-service'

import SendJobApplicantsEmailModal from '../../SendJobApplicantsEmailModal'

type Props = {
  jobId: string
  jobApplicationIds: string[]
}

export const useSendJobApplicantsEmailModal = ({
  jobId,
  jobApplicationIds
}: Props) => {
  const { showModal } = useModal(SendJobApplicantsEmailModal, {
    jobId,
    jobApplicationIds
  })

  return {
    showModal
  }
}

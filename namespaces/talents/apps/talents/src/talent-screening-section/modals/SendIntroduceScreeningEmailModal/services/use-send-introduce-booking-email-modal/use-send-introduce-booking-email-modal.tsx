import { useModal } from '@staff-portal/modals-service'

import SendIntroduceScreeningEmailModal from '../../SendIntroduceScreeningEmailModal'

export const useSendIntroduceBookingEmailModal = ({
  talentId,
  scheduledSend
}: {
  talentId: string
  scheduledSend?: boolean
}) => {
  const { showModal } = useModal(SendIntroduceScreeningEmailModal, {
    talentId,
    scheduledSend
  })

  return {
    showModal
  }
}

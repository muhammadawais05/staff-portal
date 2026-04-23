import { useModal } from '@staff-portal/modals-service'

import SendRestoreScreeningEmailModal from '../../SendRestoreScreeningEmailModal'

export const useSendRestoreBookingEmailModal = ({
  talentId
}: {
  talentId: string
}) => {
  const { showModal } = useModal(SendRestoreScreeningEmailModal, {
    talentId
  })

  return {
    showModal
  }
}

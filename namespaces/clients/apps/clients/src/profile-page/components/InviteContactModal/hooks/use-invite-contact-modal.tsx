import { useModal } from '@staff-portal/modals-service'

import InviteContactModal from '../InviteContactModal'

const useInviteContactModal = (clientId: string) => {
  const { showModal } = useModal(InviteContactModal, {
    clientId
  })

  return {
    showModal
  }
}

export default useInviteContactModal

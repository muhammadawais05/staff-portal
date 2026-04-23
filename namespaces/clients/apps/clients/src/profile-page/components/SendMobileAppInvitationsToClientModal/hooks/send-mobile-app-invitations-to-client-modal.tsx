import { useModal } from '@staff-portal/modals-service'

import SendMobileAppInvitationsToClientModal from '../SendMobileAppInvitationsToClientModal'

const useSendMobileAppInvitationsToClientModal = (clientId: string) => {
  const { showModal } = useModal(SendMobileAppInvitationsToClientModal, {
    clientId
  })

  return {
    showModal
  }
}

export default useSendMobileAppInvitationsToClientModal

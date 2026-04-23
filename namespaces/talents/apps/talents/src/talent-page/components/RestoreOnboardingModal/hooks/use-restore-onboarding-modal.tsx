import { useModal } from '@staff-portal/modals-service'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import RestoreOnboardingModal from '../RestoreOnboardingModal'

const useRestoreOnboardingModal = ({ talentId }: { talentId: string }) => {
  const { showModal: showSendEmailModal } = useSendEmailModal()
  const { showModal } = useModal(RestoreOnboardingModal, {
    talentId,
    onSendEmail: (emailTemplateId?: string) =>
      showSendEmailModal({
        nodeId: talentId,
        preselectedEmailTemplateId: emailTemplateId
      })
  })

  return {
    showModal
  }
}

export default useRestoreOnboardingModal

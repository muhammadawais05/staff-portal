import { useModal } from '@staff-portal/modals-service'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import ResetApplicationModal from '../ResetApplicationModal'

interface Params {
  talentId: string
}

const useResetApplicationModal = ({ talentId }: Params) => {
  const { showModal: showSendEmailModal } = useSendEmailModal()
  const { showModal } = useModal(ResetApplicationModal, {
    talentId,
    onSubmitSuccess: (templateId?: string) => {
      showSendEmailModal({
        nodeId: talentId,
        preselectedEmailTemplateId: templateId
      })
    }
  })

  return {
    showModal
  }
}

export default useResetApplicationModal

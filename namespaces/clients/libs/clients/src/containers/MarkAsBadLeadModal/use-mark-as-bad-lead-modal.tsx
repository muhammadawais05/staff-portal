import { useModal } from '@staff-portal/modals-service'

import MarkAsBadLeadModal from './MarkAsBadLeadModal'

const useMarkAsBadLeadModal = ({
  clientId,
  onSuccess,
  onClose
}: {
  clientId: string
  onSuccess?: () => void
  onClose?: () => void
}) => {
  const handleClose = () => {
    onClose?.()
  }

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess()
    } else {
      handleClose()
    }
  }

  const { showModal } = useModal(MarkAsBadLeadModal, {
    clientId,
    onSuccess: handleSuccess
  })

  return {
    showModal
  }
}

export default useMarkAsBadLeadModal

import { useModal } from '@staff-portal/modals-service'

import PauseClientModal from './PauseClientModal'

const usePauseClientModal = ({
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

  const { showModal } = useModal(PauseClientModal, {
    clientId,
    onSuccess: handleSuccess
  })

  return {
    showModal
  }
}

export default usePauseClientModal

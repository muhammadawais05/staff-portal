import { useModal } from '@staff-portal/modals-service'

import { ClientApproveModal } from '..'

type Props = {
  clientId: string
  onClose?: () => void
  onSuccess?: () => void
}

const useClientApproveModal = ({ clientId, onClose, onSuccess }: Props) => {
  const { showModal } = useModal(ClientApproveModal, {
    clientId,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      } else {
        onClose?.()
      }
    }
  })

  return {
    showModal
  }
}

export default useClientApproveModal

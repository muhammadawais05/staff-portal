import { useModal } from '@staff-portal/modals-service'

import RestoreApplicationModal from '../components/RestoreApplicationModal'

const useRestoreApplicationModal = ({
  companyId,
  onSuccess,
  onClose
}: {
  companyId: string
  onSuccess?: () => void
  onClose?: () => void
}) => {
  const { showModal } = useModal(RestoreApplicationModal, {
    companyId,
    onSuccess,
    onClose
  })

  return {
    showModal
  }
}

export default useRestoreApplicationModal

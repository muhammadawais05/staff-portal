import { useModal } from '@staff-portal/modals-service'

import DeleteDuplicateModal from '../DeleteDuplicateModal'

const useDeleteDuplicateModal = ({
  companyId,
  fullName
}: {
  companyId: string
  fullName: string
}) => {
  const { showModal } = useModal(DeleteDuplicateModal, {
    companyId,
    fullName
  })

  return {
    showModal
  }
}

export default useDeleteDuplicateModal

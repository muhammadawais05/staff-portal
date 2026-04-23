import { useModal } from '@staff-portal/modals-service'

import RepauseCompanyModal from '../RepauseCompanyModal'

const useRepauseCompanyModal = ({
  companyId,
  onSuccess,
  onClose
}: {
  companyId: string
  onSuccess?: () => void
  onClose?: () => void
}) => {
  const { showModal } = useModal(RepauseCompanyModal, {
    companyId,
    onRepauseCompany: onSuccess,
    onClose
  })

  return {
    showModal
  }
}

export default useRepauseCompanyModal

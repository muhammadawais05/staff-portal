import { useModal } from '@staff-portal/modals-service'

import ResumeCompanyModal from '../ResumeCompanyModal'

const useResumeCompanyModal = ({
  companyId,
  onSuccess,
  onClose
}: {
  companyId: string
  onSuccess?: () => void
  onClose?: () => void
}) => {
  const { showModal } = useModal(ResumeCompanyModal, {
    companyId,
    onResumeCompany: onSuccess,
    onClose
  })

  return {
    showModal
  }
}

export default useResumeCompanyModal

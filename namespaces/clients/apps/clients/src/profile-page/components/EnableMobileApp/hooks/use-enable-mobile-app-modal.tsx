import { useModal } from '@staff-portal/modals-service'

import EnableMobileAppModal from '../EnableMobileAppModal'

const useEnableMobileAppModal = ({ companyId }: { companyId: string }) => {
  const { showModal } = useModal(EnableMobileAppModal, {
    companyId
  })

  return {
    showModal
  }
}

export default useEnableMobileAppModal

import { useModal } from '@staff-portal/modals-service'

import DisableMobileAppModal from '../DisableMobileAppModal'

const useDisableMobileAppModal = ({ companyId }: { companyId: string }) => {
  const { showModal } = useModal(DisableMobileAppModal, {
    companyId
  })

  return {
    showModal
  }
}

export default useDisableMobileAppModal

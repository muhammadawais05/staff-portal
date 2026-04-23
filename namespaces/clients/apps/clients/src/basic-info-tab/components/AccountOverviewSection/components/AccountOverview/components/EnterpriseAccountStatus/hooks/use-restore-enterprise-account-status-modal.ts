import { useModal } from '@staff-portal/modals-service'

import RestoreEnterpriseAccountStatusModal from '../components/RestoreEnterpriseAccountStatusModal'

const useRestoreEnterpriseAccountStatusModal = (clientId: string) => {
  const { showModal } = useModal(RestoreEnterpriseAccountStatusModal, {
    clientId
  })

  return {
    showModal
  }
}

export default useRestoreEnterpriseAccountStatusModal

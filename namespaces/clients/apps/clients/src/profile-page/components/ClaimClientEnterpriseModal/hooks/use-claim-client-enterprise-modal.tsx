import { useModal } from '@staff-portal/modals-service'

import ClaimClientEnterpriseModal from '../ClaimClientEnterpriseModal'

const useClaimClientEnterpriseModal = ({ clientId }: { clientId: string }) => {
  const { showModal } = useModal(ClaimClientEnterpriseModal, {
    clientId
  })

  return {
    showModal
  }
}

export default useClaimClientEnterpriseModal

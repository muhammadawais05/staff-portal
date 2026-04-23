import { useModal } from '@staff-portal/modals-service'

import DisableEmbeddedSigningModal from '../DisableEmbeddedSigningModal'

const useDisableEmbeddedSigningModal = ({
  companyId
}: {
  companyId: string
}) => {
  const { showModal } = useModal(DisableEmbeddedSigningModal, {
    companyId
  })

  return {
    showModal
  }
}

export default useDisableEmbeddedSigningModal

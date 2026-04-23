import { useModal } from '@staff-portal/modals-service'

import EnableEmbeddedSigningModal from '../EnableEmbeddedSigningModal'

const useEnableEmbeddedSigningModal = ({
  companyId
}: {
  companyId: string
}) => {
  const { showModal } = useModal(EnableEmbeddedSigningModal, {
    companyId
  })

  return {
    showModal
  }
}

export default useEnableEmbeddedSigningModal

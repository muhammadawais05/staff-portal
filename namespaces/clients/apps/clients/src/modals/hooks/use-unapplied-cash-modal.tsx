import { useModal } from '@staff-portal/modals-service'

import UnappliedCashModal from '../components/UnappliedCashModal'

const useUnappliedCashModal = ({ companyId }: { companyId: string }) => {
  const { showModal } = useModal(UnappliedCashModal, {
    companyId
  })

  return {
    showModal
  }
}

export default useUnappliedCashModal

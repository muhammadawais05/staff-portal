import { useModal } from '@staff-portal/modals-service'

import ChangeSourcerModal from '../components/ChangeSourcerModal'

const useChangeSourcerModal = ({ talentId }: { talentId: string }) => {
  const { showModal } = useModal(ChangeSourcerModal, { talentId })

  return {
    showModal
  }
}

export default useChangeSourcerModal

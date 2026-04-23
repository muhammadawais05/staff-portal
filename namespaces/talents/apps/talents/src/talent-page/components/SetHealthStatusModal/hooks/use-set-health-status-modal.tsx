import { TalentFragment } from '@staff-portal/talents'
import { useModal } from '@staff-portal/modals-service'

import SetHealthStatusModal from '../SetHealthStatusModal'

const useSetHealthStatusModal = ({ id: talentId }: TalentFragment) => {
  const { showModal } = useModal(SetHealthStatusModal, {
    talentId
  })

  return { showModal }
}

export default useSetHealthStatusModal

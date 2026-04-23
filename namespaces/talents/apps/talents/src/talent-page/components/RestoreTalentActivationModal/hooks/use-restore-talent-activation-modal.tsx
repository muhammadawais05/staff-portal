import { useModal } from '@staff-portal/modals-service'

import RestoreTalentActivationModal from '../RestoreTalentActivationModal'

const useRestoreTalentActivationModal = ({
  talentId
}: {
  talentId: string
}) => {
  const { showModal } = useModal(RestoreTalentActivationModal, {
    talentId: talentId
  })

  return {
    showModal
  }
}

export default useRestoreTalentActivationModal

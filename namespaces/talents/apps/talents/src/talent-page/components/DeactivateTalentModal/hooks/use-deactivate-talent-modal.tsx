import { useModal } from '@staff-portal/modals-service'

import DeactivateTalentModal from './../DeactivateTalentModal'

const useDeactivateTalentModal = ({
  talentId,
  fullName,
  talentType
}: {
  talentId: string
  fullName: string
  talentType: string
}) => {
  const { showModal } = useModal(DeactivateTalentModal, {
    talentId,
    fullName,
    talentType
  })

  return {
    showModal
  }
}

export default useDeactivateTalentModal

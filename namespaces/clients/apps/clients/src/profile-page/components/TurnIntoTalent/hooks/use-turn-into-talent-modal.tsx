import { useModal } from '@staff-portal/modals-service'

import TurnIntoTalent from '../TurnIntoTalent'

const useTurnIntoTalentModal = ({
  companyId,
  fullName
}: {
  companyId: string
  fullName: string
}) => {
  const { showModal } = useModal(TurnIntoTalent, {
    companyId,
    fullName
  })

  return {
    showModal
  }
}

export default useTurnIntoTalentModal

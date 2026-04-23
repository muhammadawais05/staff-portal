import { useModal } from '@staff-portal/modals-service'

import ActivateTopScreenPositionModal from '../../ActivateTopScreenPositionModal'

type Props = {
  positionId: string
}

const useActivateTopScreenPositionModal = ({ positionId }: Props) => {
  const { showModal } = useModal(ActivateTopScreenPositionModal, {
    positionId
  })

  return {
    showModal
  }
}

export default useActivateTopScreenPositionModal

import { useModal } from '@staff-portal/modals-service'

import AddNewTopscreenPositionModal from '../../AddNewTopscreenPositionModal'

type Props = {
  topscreenClientId: string
}

const useAddNewTopscreenPositionModal = ({ topscreenClientId }: Props) => {
  const { showModal } = useModal(AddNewTopscreenPositionModal, {
    topscreenClientId
  })

  return {
    showModal
  }
}

export default useAddNewTopscreenPositionModal

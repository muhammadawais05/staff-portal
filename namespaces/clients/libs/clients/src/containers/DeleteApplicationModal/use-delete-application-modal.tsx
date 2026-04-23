import { useModal } from '@staff-portal/modals-service'

import DeleteApplicationModal from './DeleteApplicationModal'

type Props = {
  clientId: string
}

const useDeleteApplicationModal = (props: Props) => {
  const { showModal } = useModal(DeleteApplicationModal, props)

  return {
    showModal
  }
}

export default useDeleteApplicationModal

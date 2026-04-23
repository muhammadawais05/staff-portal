import { useModal } from '@staff-portal/modals-service'

import UpdateCascadeParentModal from '../components/UpdateCascadeParentModal'

const useUpdateCascadeParentModal = ({
  clientId,
  parentId
}: {
  clientId: string
  parentId: string
}) => {
  const { showModal } = useModal(UpdateCascadeParentModal, {
    clientId,
    parentId
  })

  return {
    showModal
  }
}

export default useUpdateCascadeParentModal

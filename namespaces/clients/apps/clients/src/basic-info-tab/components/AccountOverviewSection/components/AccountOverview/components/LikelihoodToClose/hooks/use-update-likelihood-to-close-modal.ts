import { useModal } from '@staff-portal/modals-service'

import { LikelihoodToCloseModal } from '../components/LikelihoodToCloseModal'

const useUpdateLikelihoodToCloseModal = (clientId: string) => {
  const { showModal } = useModal(LikelihoodToCloseModal, {
    clientId
  })

  return {
    showModal
  }
}

export default useUpdateLikelihoodToCloseModal

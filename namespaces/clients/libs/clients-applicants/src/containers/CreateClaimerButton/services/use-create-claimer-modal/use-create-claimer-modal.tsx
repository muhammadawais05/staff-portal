import { useModal } from '@staff-portal/modals-service'

import { CreateClaimerModal } from '../../components'

export const useCreateClaimerModal = (clientId: string) => {
  const { showModal } = useModal(CreateClaimerModal, { clientId })

  return {
    showModal
  }
}

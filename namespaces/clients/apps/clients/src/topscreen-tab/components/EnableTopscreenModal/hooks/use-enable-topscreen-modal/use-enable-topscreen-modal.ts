import { useModal } from '@staff-portal/modals-service'

import EnableTopscreenModal from '../../EnableTopscreenModal'

type Props = {
  clientId: string
}

const useEnableTopscreenModal = ({ clientId }: Props) => {
  const { showModal } = useModal(EnableTopscreenModal, {
    clientId
  })

  return {
    showModal
  }
}

export default useEnableTopscreenModal

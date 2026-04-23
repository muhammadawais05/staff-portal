import { useModal } from '@staff-portal/modals-service'

import SendGeneralEmailModal, {
  SendGeneralEmailModalProps
} from '../components/SendGeneralEmailModal'

type Props = Omit<SendGeneralEmailModalProps, 'hideModal'>

export const useSendEmailModal = (props: Props = { nodeId: '' }) => {
  const { showDetachedModal } = useModal(SendGeneralEmailModal, null)

  return {
    showModal: (modalProps?: Props) => {
      showDetachedModal(modalProps ?? props)
    }
  }
}

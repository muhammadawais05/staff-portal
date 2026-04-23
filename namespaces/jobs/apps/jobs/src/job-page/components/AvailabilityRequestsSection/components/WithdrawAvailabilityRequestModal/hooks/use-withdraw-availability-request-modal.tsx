import { useModal } from '@staff-portal/modals-service'

import WithdrawAvailabilityRequestModal from '../WithdrawAvailabilityRequestModal'

type Props = {
  availabilityRequestId: string
}

const useWithdrawAvailabilityRequestModal = ({
  availabilityRequestId
}: Props) => {
  const { showModal } = useModal(WithdrawAvailabilityRequestModal, {
    availabilityRequestId
  })

  return {
    showModal
  }
}

export default useWithdrawAvailabilityRequestModal

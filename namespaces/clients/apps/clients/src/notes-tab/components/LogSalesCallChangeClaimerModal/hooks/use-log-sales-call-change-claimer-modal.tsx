import { useModal } from '@staff-portal/modals-service'

import LogSalesCallChangeClaimerModal from '../LogSalesCallChangeClaimerModal'

export const useLogSalesCallChangeClaimer = ({
  clientName,
  onCompleted
}: {
  clientName: string
  onCompleted: () => void
}) => {
  const { showModal } = useModal(LogSalesCallChangeClaimerModal, {
    clientName,
    onCompleted
  })

  return {
    showModal
  }
}

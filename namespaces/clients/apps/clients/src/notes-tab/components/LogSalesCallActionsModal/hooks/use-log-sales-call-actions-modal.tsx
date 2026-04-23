import { useModal } from '@staff-portal/modals-service'

import { ClientClaimingOperationsFragment } from '../../../data/client-claiming-operations-fragment'
import { LogSalesCallBusinessAction } from '../../../types'
import LogSalesCallActionsModal from '../LogSalesCallActionsModal'

export const useLogSalesCallActionsModal = ({
  clientId,
  operations,
  onSubmit
}: {
  clientId: string
  operations?: ClientClaimingOperationsFragment
  onSubmit: (companyAction: LogSalesCallBusinessAction) => void
}) => {
  const { showModal } = useModal(LogSalesCallActionsModal, {
    clientId,
    operations,
    onSubmit
  })

  return {
    showModal
  }
}

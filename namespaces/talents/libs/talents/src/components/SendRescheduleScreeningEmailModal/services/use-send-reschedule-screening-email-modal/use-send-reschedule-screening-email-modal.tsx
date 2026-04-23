import { useCallback } from 'react'
import { useModal } from '@staff-portal/modals-service'

import SendRescheduleScreeningEmailModal from '../../SendRescheduleScreeningEmailModal'

type Options = {
  talentId?: string
}

export const useSendRescheduleScreeningEmailModal = () => {
  const { showDetachedModal } = useModal(
    SendRescheduleScreeningEmailModal,
    null
  )

  const showModal = useCallback(
    ({ talentId }: Options) => {
      if (!talentId) {
        return
      }

      showDetachedModal({ talentId })
    },
    [showDetachedModal]
  )

  return {
    showModal
  }
}

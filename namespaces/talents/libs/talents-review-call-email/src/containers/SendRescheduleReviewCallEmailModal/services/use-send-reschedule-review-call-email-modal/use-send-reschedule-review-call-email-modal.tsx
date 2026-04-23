import { useCallback } from 'react'
import { useModal } from '@staff-portal/modals-service'

import SendRescheduleReviewCallEmailModal from '../../SendRescheduleReviewCallEmailModal'

type Options = {
  stepId?: string
  talentId?: string
}

export const useSendRescheduleReviewCallEmailModal = () => {
  const { showDetachedModal } = useModal(
    SendRescheduleReviewCallEmailModal,
    null
  )

  const showModal = useCallback(
    ({ talentId, stepId }: Options) => {
      if (!talentId) {
        return
      }

      showDetachedModal({ stepId, talentId })
    },
    [showDetachedModal]
  )

  return {
    showModal
  }
}

import { useModal } from '@staff-portal/modals-service'

import RequestAvailabilityModal from '../RequestAvailabilityModal'
import { AvailabilityRequestInitialJobData } from '../../../types'

const useRequestAvailabilityModal = (
  talentId: string,
  initialJobData?: AvailabilityRequestInitialJobData
) => {
  const { showModal } = useModal(RequestAvailabilityModal, {
    talentId,
    initialJobData
  })

  return {
    showModal
  }
}

export default useRequestAvailabilityModal

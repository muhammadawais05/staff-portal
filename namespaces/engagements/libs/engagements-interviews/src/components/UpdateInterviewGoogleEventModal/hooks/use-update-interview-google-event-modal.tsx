import { useModal } from '@staff-portal/modals-service'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import UpdateInterviewGoogleEventModal from '../UpdateInterviewGoogleEventModal'
import { GetInterviewGoogleEventDataDocument } from '../data'

export const useUpdateInterviewGoogleEventModal = (interviewId: string) => {
  const [getInterviewEventData, { data, loading }] = useLazyQuery(
    GetInterviewGoogleEventDataDocument,
    {
      variables: { interviewId },
      onCompleted: () => {
        showModal()
      }
    }
  )

  const { showModal } = useModal(UpdateInterviewGoogleEventModal, {
    interviewId,
    scheduleEngagement: data?.node?.engagement,
    scheduleInterview: data?.node,
    googleEvent: data?.node?.googleCalendarEvent
  })

  return {
    loading,
    showModal: getInterviewEventData
  }
}

import { useModal } from '@staff-portal/modals-service'
import { useFieldPollingUpdate } from '@staff-portal/data-layer-service'

import { GetClientFollowUpStatusCommentDocument } from '../../../data/get-client-follow-up-status-comment.staff.gql.types'
import useGetClientLeadStatusModalData from '../../../utils/use-get-client-lead-status-modal-data'
import LeadStatusModal from '../components/LeadStatusModal'

const useUpdateLeadStatusModal = (clientId: string) => {
  const { startPolling } = useFieldPollingUpdate(
    GetClientFollowUpStatusCommentDocument,
    {
      variables: {
        clientId
      },
      pollInterval: 3000,
      maxAttempts: 4
    }
  )
  const { getData, data, loading } = useGetClientLeadStatusModalData(clientId)

  const { showModal } = useModal(LeadStatusModal, {
    clientId,
    initialLoading: loading,
    data: data ?? {},
    startPolling
  })

  return {
    showModal: () => {
      getData()
      showModal()
    },
    loading
  }
}

export default useUpdateLeadStatusModal

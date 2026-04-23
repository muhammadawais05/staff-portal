import { useGetNode } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'

import { GetJobPageDataDocument } from '../data/get-meetings/get-meetings.staff.gql.types'

export const useGetMeetings = (jobId: string) => {
  const { showError } = useNotifications()

  const { data, error, loading } = useGetNode(GetJobPageDataDocument)({ jobId })

  if (error) {
    showError('Error getting meetings data')
  }

  return { data, loading }
}

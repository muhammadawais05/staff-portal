import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetTaskDescriptionDocument } from '../data/get-task-description/get-task-description.staff.gql.types'

export const getTaskDescriptionHook = (taskId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetTaskDescriptionDocument,
    {
      variables: { taskId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.description || '',
    called
  }
}

import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetTaskDueDateDocument } from '../data/task-due-date'

export const getTaskDueDateHook = (taskId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetTaskDueDateDocument,
    {
      variables: { taskId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.dueDate,
    called
  }
}

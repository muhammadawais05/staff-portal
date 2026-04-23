import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

export const getJobRelatedTasksResponse = (job?: Partial<Job>) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Job'),
      __typename: 'Job',
      relatedTasks: {
        completedCount: 0,
        nodes: [],
        ...job?.relatedTasks,
        __typename: 'RelatedTasksConnection'
      }
    }
  }
})

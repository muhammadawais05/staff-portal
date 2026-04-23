import { Job, JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getJobFeedbacksResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      status: JobStatus.ACTIVE,
      feedbacks: {
        nodes: [],
        __typename: 'FeedbackConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})

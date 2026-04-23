import { Job, JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getAvailabilityRequestItemsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      status: JobStatus.ACTIVE,
      jobType: 'developer',
      availabilityRequests: {
        nodes: [],
        totalCount: 0,
        __typename: 'AvailabilityRequestConnection'
      },
      totalAvailabilityRequests: {
        totalCount: 0,
        __typename: 'AvailabilityRequestConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})

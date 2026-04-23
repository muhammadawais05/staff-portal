import { Job, JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getJobApplicationsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      status: JobStatus.ACTIVE,
      applications: {
        nodes: [],
        totalCount: 0,
        __typename: 'JobApplicationConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})

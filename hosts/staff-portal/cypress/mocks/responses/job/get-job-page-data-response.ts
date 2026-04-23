import { Job } from '@staff-portal/graphql/staff'

import { getJobMock } from '~integration/mocks/fragments'

export const getJobPageDataResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      ...getJobMock(job),
      jobCurrentEngagement: job?.currentEngagement ?? null
    }
  }
})

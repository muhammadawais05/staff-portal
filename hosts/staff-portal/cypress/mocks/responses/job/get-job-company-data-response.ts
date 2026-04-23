import { Job } from '@staff-portal/graphql/staff'

import { getJobMock } from '~integration/mocks/fragments'

export const getJobCompanyDataResponse = (job?: Partial<Job>) => ({
  data: {
    node: getJobMock(job)
  }
})

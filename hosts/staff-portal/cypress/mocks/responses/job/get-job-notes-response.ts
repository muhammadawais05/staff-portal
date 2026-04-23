import { Job } from '@staff-portal/graphql/staff'

import { getJobMock } from '~integration/mocks/fragments'

export const getJobNotesResponse = (job?: Partial<Job>) => ({
  data: {
    node: getJobMock(job)
  }
})

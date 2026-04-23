import { Job } from '@staff-portal/graphql/staff'

import { getJobMock } from '~integration/mocks/fragments'

export const getJobDetailsInformationResponse = (job?: Partial<Job>) => ({
  data: {
    viewer: {
      permits: {
        canViewOpportunities: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    node: getJobMock(job)
  }
})

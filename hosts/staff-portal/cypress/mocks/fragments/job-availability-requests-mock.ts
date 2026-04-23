import { Job } from '@staff-portal/graphql/staff'

import { jobAvailabilityRequestsItemMock } from './job-availability-requests-item-mock'

export const jobAvailabilityRequestsMock = (node?: Partial<Job>) => ({
  node: () =>
    ({
      id: 'VjEtSm9iLTI2NjE2Mw',
      status: 'PENDING_ENGINEER',
      jobType: 'developer',
      availabilityRequests: {
        nodes: [jobAvailabilityRequestsItemMock()],
        totalCount: 1,
        ...node?.availabilityRequests
      },
      totalAvailabilityRequests: {
        totalCount: 3
      },
      ...node
    } as Partial<Job>)
})

import { AvailabilityRequest } from '@staff-portal/graphql/staff'
import { AvailabilityRequestItemFragment } from '@staff-portal/jobs-app'

import { talentNodeMock } from '~integration/mocks/fragments/talent-node-mock'

export const jobAvailabilityRequestsItemMock = (
  node?: Partial<AvailabilityRequestItemFragment>
) =>
  ({
    id: 'VjEtQXZhaWxhYmlsaXR5UmVxdWVzdC03ODY3OTk',
    talent: talentNodeMock().node(),
    jobIssues: {
      status: 'OK',
      failedMetrics: []
    },
    createdAt: '2021-10-18T23:57:19+03:00',
    talentJobScoring: null,
    requestedHourlyRate: null,
    defaultClientRates: {
      hourlyRate: '63',
      weeklyRateFullTime: '2520.0',
      weeklyRatePartTime: '1260.0'
    },
    status: 'PENDING',
    expirationReason: null,
    talentComment: null,
    rejectReason: null,
    sendCandidateUrl: null,
    candidateStatus: null,
    ...node
  } as unknown as AvailabilityRequest)

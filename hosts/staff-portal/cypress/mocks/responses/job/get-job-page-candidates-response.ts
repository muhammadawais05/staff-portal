import { Job, JobEngagementEdge } from '@staff-portal/graphql/staff'

import { getJobMock } from '~integration/mocks/fragments'

export const getJobPageCandidatesResponse = (
  job?: Partial<Job>,
  candidateEngagements: Partial<JobEngagementEdge>[] = [],
  inactiveCandidateEngagements: Partial<JobEngagementEdge>[] = []
) => ({
  data: {
    viewer: {
      permits: {
        canViewEngagements: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    node: {
      ...getJobMock(job),
      candidateEngagements: {
        edges: candidateEngagements,
        __typename: 'JobEngagementConnection'
      },
      inactiveCandidateEngagements: {
        edges: inactiveCandidateEngagements,
        __typename: 'JobEngagementConnection'
      },
      __typename: 'Job'
    }
  }
})

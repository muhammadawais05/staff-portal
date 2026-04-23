import { CumulativeJobStatus, JobStatus } from '@staff-portal/graphql/staff'

export default {
  id: 'VjEtQ2xpZW50LTg0NTUz',
  fullName: 'test client',
  jobs: {
    totalCount: 1,
    nodes: [
      {
        id: 'VjEtUmV2aWV3QXR0ZW1wdC02MDM3OQ',
        talentCount: 2,
        status: JobStatus.ACTIVE,
        hiredCount: 2,
        matcherCallScheduled: false,
        cumulativeStatus: CumulativeJobStatus.ACTIVE,
        title: 'Principal Security Designer (251407)',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/jobs/251407',
          __typename: 'Link'
        },
        currentTalents: {
          nodes: [
            {
              id: 'VjEtVGFsZW50LTEyMDQwNzE',
              fullName: 'Rusty Predovic',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/talents/1204071',
                __typename: 'Link'
              },
              __typename: 'Talent'
            },
            {
              id: 'VjEtVGFsZW50LTE2NDkwNjk',
              fullName: 'Bridgette Cormier',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/talents/1649069',
                __typename: 'Link'
              },
              __typename: 'Talent'
            }
          ],
          totalCount: 2,
          __typename: 'TalentConnection'
        },
        claimer: {
          id: 'VjEtU3RhZmYtNjg1NzI2',
          fullName: 'Lowell Ortiz',
          webResource: {
            url: 'https://staging.toptal.net/platform/staff/staff/685726',
            __typename: 'Link'
          },
          __typename: 'Staff'
        },
        currentInvestigation: null,
        __typename: 'Job'
      }
    ],
    __typename: 'InvestigationJobsConnection'
  },
  __typename: 'Client'
}

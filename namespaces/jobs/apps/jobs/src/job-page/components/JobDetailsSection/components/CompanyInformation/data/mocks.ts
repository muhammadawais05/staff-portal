import { JobStatus, CumulativeJobStatus } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { GetJobCompanyDataFragment } from './get-job-company-data.staff.gql.types'
import GET_JOB_COMPANY_DATA from './get-job-company-data.staff.gql'

export const createJobMock = (job?: Partial<GetJobCompanyDataFragment>) => {
  return {
    id: job?.id || 'VjEtSm9iLTI2MTA0Ng',
    title: 'Chief Web Developer (261046)',
    jobType: 'developer',
    postedAt: '2021-09-10T21:44:26+03:00',
    talentCount: 1,
    status: job?.status || JobStatus.PENDING_ENGINEER,
    hiredCount: 0,
    matcherCallScheduled: false,
    cumulativeStatus:
      job?.cumulativeStatus || CumulativeJobStatus.PENDING_ENGINEER,
    currentInvestigation: null,
    client: job?.client || {
      id: 'VjEtQ2xpZW50LTUxNDk3NA',
      enterprise: true,
      businessType: 'Enterprise business',
      webResource: {
        text: 'Kirlin, Kemmer and Turcotte',
        url: 'https://staging.toptal.net/platform/staff/companies/2445793',
        __typename: 'Link'
      },
      clientPartner: {
        id: 'test-id',
        fullName: 'Claimer Name',
        webResource: {
          text: 'Claimer Name',
          url: 'client-partner.url'
        }
      },
      claimer: {
        id: 'test-id',
        fullName: 'Claimer Name',
        webResource: {
          text: 'Claimer Name',
          url: 'sales-claimer.url'
        }
      },
      __typename: 'Client'
    },
    claimer: {
      id: 'test-id',
      fullName: 'Claimer Name',
      webResource: {
        text: 'Claimer Name',
        url: 'test.url'
      }
    },
    currentSalesOwner: {
      owner: {
        id: 'VjEtU3RhZmYtMjQ0MjQ4Ng',
        fullName: 'Andrew Cavin',
        webResource: {
          text: 'Andrew Cavin',
          url: 'https://staging.toptal.net/platform/staff/staff/2442486',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      relationship: 'RM',
      __typename: 'SalesOwner'
    },
    countryRequirements: {
      nodes: [{ code: 'US', id: '1', name: 'United States' }]
    },
    languages: {
      nodes: [{ id: '1', name: 'English' }]
    },
    timeZonePreference: {
      name: '(UTC-05:00) America - Chicago',
      value: 'America/Chicago',
      __typename: 'TimeZone'
    },
    operations: {
      updateJobEstimatedEndDate: {
        callable: 'ENABLED',
        messages: [],
        __typename: 'Operation'
      },
      updateJobClaimer: {
        callable: 'ENABLED',
        messages: [],
        __typename: 'Operation'
      }
    },
    description: 'Job description',
    categories: { nodes: [{ id: '1', name: 'category' }] },
    __typename: 'Job'
  } as GetJobCompanyDataFragment
}

export const createGetJobDetailsMock = ({
  jobId,
  job
}: {
  jobId: string
  job?: Partial<GetJobCompanyDataFragment>
}): MockedResponse => ({
  request: {
    query: GET_JOB_COMPANY_DATA,
    variables: {
      jobId
    }
  },
  result: {
    data: {
      node: {
        ...createJobMock(job)
      }
    }
  }
})

export const createGetJobDetailsFailedMock = ({
  jobId
}: {
  jobId: string
}): MockedResponse => ({
  request: {
    query: GET_JOB_COMPANY_DATA,
    variables: { jobId }
  },
  error: new Error('Mocked Error')
})

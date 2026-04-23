import {
  JobStatus,
  TalentAllocatedHoursAvailability
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { AvailabilityRequestItemFragment } from './get-availability-requests.staff.gql.types'
import { GET_AVAILABILITY_REQUESTS } from './get-availability-requests.staff.gql'

export const createAvailabilityRequestMock = (
  application?: Partial<AvailabilityRequestItemFragment>
) => {
  return {
    id: application?.id || '123',
    createdAt: '2021-06-23T11:30:23+03:00',
    talent: {
      id: 'VjEtVGFsZW50LTExNjgzMTI',
      cumulativeStatus: 'ACTIVE',
      type: 'Developer',
      roleTitle: 'Developer',
      fullName: 'Shyla Heidenreich',
      suspended: false,
      webResource: {
        text: 'Shyla Heidenreich',
        url: 'https://staging.toptal.net/platform/staff/talents/1168312',
        __typename: 'Link'
      },
      __typename: 'Talent',
      allocatedHoursAvailability: TalentAllocatedHoursAvailability.PART_TIME,
      allocatedHoursAvailabilityIncludingEndingEngagements:
        TalentAllocatedHoursAvailability.PART_TIME,
      availableHours: 5,
      availableHoursIncludingEndingEngagements: 5,
      allocatedHours: 15,
      allocatedHoursConfirmedAt: '2021-08-08T08:30:24+03:00',
      availabilityRequestMetadata: {
        lowActivity: false,
        pending: 0,
        prediction: 0.1490207977315468,
        recentConfirmed: 1,
        recentRejected: 3,
        __typename: 'TalentAvailabilityRequestMetadata'
      },
      endingEngagements: {
        nodes: [],
        __typename: 'EndingEngagementConnection'
      },
      unavailableAllocatedHoursChangeRequest: null,
      associatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      hourlyRate: '60.0'
    },
    jobIssues: {
      status: 'CRITICAL',
      ...application?.jobIssues,
      failedMetrics: application?.jobIssues?.failedMetrics?.map(metric => ({
        ...(metric as object),
        __typename: 'TalentJobIssueMetric'
      })) || [
        {
          message: 'Talent has been introduced on 2 jobs',
          name: 'introduced_engagements_metric',
          status: 'FAILURE',
          __typename: 'TalentJobIssueMetric'
        } as object
      ],
      __typename: 'TalentJobEdgeJobIssues'
    },
    talentJobScoring: {
      bestMatchScore: 0.685,
      bestMatchScoreRank: 0,
      totalTalentRanked: 41,
      __typename: 'TalentJobScoring'
    },
    requestedHourlyRate: '60.0',
    defaultClientRates: {
      hourlyRate: '85',
      weeklyRateFullTime: '3400.0',
      weeklyRatePartTime: '1700.0',
      __typename: 'DefaultClientRates'
    },
    status: 'CONFIRMED',
    expirationReason: null,
    talentComment: '',
    rejectReason: null,
    sendCandidateUrl:
      'https://staging.toptal.net/platform/staff/engagements/new?engagement%5Bjob_id%5D=260181&engagement%5Btalent_id%5D=1168312',
    candidateStatus: 'AVAILABLE_FOR_SEND',
    resumeUrl: 'https://someurl.com',
    __typename: 'AvailabilityRequest'
  } as AvailabilityRequestItemFragment
}

export const createGetAvailabilityRequestsMock = ({
  jobId,
  status = JobStatus.PENDING_ENGINEER,
  jobType,
  availabilityRequests
}: {
  jobId: string
  status?: JobStatus
  jobType?: string
  availabilityRequests?: Partial<AvailabilityRequestItemFragment[]>
}): MockedResponse => ({
  request: {
    query: GET_AVAILABILITY_REQUESTS,
    variables: {
      jobId
    }
  },
  result: {
    data: {
      node: {
        id: 'test-id',
        status,
        jobType,
        availabilityRequests: {
          nodes: !availabilityRequests?.length
            ? []
            : availabilityRequests.map(item =>
                createAvailabilityRequestMock(item)
              ),
          totalCount: availabilityRequests?.length || 0,
          __typename: 'AvailabilityRequestConnection'
        },
        __typename: 'Job'
      }
    }
  }
})

export const createGetJobApplicationsFailedMock = ({
  jobId
}: {
  jobId: string
}): MockedResponse => ({
  request: {
    query: GET_AVAILABILITY_REQUESTS,
    variables: { jobId }
  },
  error: new Error('Mocked Error')
})

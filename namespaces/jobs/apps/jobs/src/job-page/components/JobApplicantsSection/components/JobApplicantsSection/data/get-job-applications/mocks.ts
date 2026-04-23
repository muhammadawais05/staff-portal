import {
  JobStatus,
  TalentAllocatedHoursAvailability
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { JobApplicationItemFragment } from './get-job-applications.staff.gql.types'
import { GET_JOB_APPLICATIONS } from './get-job-applications.staff.gql'

export const createJobApplicationMock = (
  application?: Partial<JobApplicationItemFragment>
) => {
  return {
    id: application?.id || '123',
    createdAt: '2021-06-23T11:30:23+03:00',
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
    talentPitch: application?.talentPitch
      ? { ...application?.talentPitch, __typename: 'PitchText' }
      : null,
    talentJobScoring: {
      bestMatchScore: 0.271,
      bestMatchScoreRank: 44,
      totalTalentRanked: 60,
      ...(application?.talentJobScoring as object),
      __typename: 'TalentJobScoring'
    },
    requestedHourlyRate: '65.0',
    defaultClientRates: {
      hourlyRate: '142',
      weeklyRateFullTime: '4544.0',
      weeklyRatePartTime: '2272.0',
      __typename: 'DefaultClientRates'
    },
    talent: {
      id: 'VjEtVGFsZW50LTE4MzAxNDI',
      type: 'ProductManager',
      roleTitle: 'Product Manager',
      allocatedHoursAvailability: TalentAllocatedHoursAvailability.FULL_TIME,
      allocatedHoursAvailabilityIncludingEndingEngagements:
        TalentAllocatedHoursAvailability.FULL_TIME,
      availableHours: 40,
      availableHoursIncludingEndingEngagements: 40,
      allocatedHours: 40,
      allocatedHoursConfirmedAt: '2021-06-23T09:02:29+03:00',
      fullName: 'Domenic Koss',
      hourlyRate: '65.0',
      resumeUrl:
        'https://staging.toptal.net/product-managers/resume/obfuscated_slug_878771',
      ...application?.talent,
      preliminarySearchSetting: {
        enabled: true,
        __typename: 'TalentPreliminarySearchSetting'
      },
      unavailableAllocatedHoursChangeRequest: null,
      endingEngagements: {
        nodes: [],
        __typename: 'EndingEngagementConnection'
      },
      __typename: 'Talent',
      webResource: {
        text: 'Domenic Koss',
        url: 'https://staging.toptal.net/platform/staff/talents/1830142',
        __typename: 'Link'
      },
      associatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      }
    },
    emailMessaging: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdKb2JBcHBsaWNhdGlvbi0xMjM='
    },
    resumeUrl:
      'https://staging.toptal.net/product-managers/resume/obfuscated_slug_878771',
    __typename: 'JobApplication'
  } as JobApplicationItemFragment
}

export const createGetJobApplicationsMock = ({
  jobId,
  status = JobStatus.PENDING_ENGINEER,
  applications
}: {
  jobId: string
  status?: JobStatus
  applications?: Partial<JobApplicationItemFragment[]>
}): MockedResponse => ({
  request: {
    query: GET_JOB_APPLICATIONS,
    variables: {
      jobId
    }
  },
  result: {
    data: {
      node: {
        id: 'test-id',
        status,
        applications: {
          nodes: !applications?.length
            ? []
            : applications.map(item => createJobApplicationMock(item)),
          totalCount: applications?.length || 0,
          __typename: 'JobApplicationConnection'
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
    query: GET_JOB_APPLICATIONS,
    variables: { jobId }
  },
  error: new Error('Mocked Error')
})

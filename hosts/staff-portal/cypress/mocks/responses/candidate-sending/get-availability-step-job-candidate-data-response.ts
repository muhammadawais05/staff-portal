import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  EngagementCommitmentEnum,
  JobCommitment,
  JobStatus,
  JobWorkType
} from '@staff-portal/graphql/staff'
import { JobType } from '@staff-portal/jobs'

export const getAvailabilityStepJobCandidateDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      title: 'Supreme Final Boss Developer (101101)',
      postedAt: '2022-04-11T21:52:11+03:00',
      commitment: JobCommitment.FULL_TIME,
      talentCount: 1,
      engagements: {
        nodes: [
          {
            id: encodeEntityId('123', 'Engagement'),
            commitment: EngagementCommitmentEnum.FULL_TIME,
            __typename: 'Engagement'
          }
        ],
        __typename: 'JobEngagementConnection'
      },
      client: {
        id: encodeEntityId('123', 'Client'),
        enterprise: true,
        fullName: "O'Hara-Rice UB",
        webResource: {
          text: "O'Hara-Rice UB",
          url: 'https://staging.toptal.net/platform/staff/companies/2324860',
          __typename: 'Link'
        },
        __typename: 'Client'
      },
      hoursOverlapEnum: 'HOUR_2',
      timeZonePreference: {
        name: '(UTC-07:00) America - Los Angeles',
        value: 'America/Los_Angeles',
        __typename: 'TimeZone'
      },
      workType: JobWorkType.REMOTE,
      jobType: JobType.DESIGNER,
      status: JobStatus.PENDING_ENGINEER,
      hiredCount: 0,
      matcherCallScheduled: false,
      cumulativeStatus: JobStatus.PENDING_ENGINEER,
      currentInvestigation: null,
      __typename: 'Job',
      rehire: false,
      automatedAvailabilityRequests: false,
      hasPreferredHours: false,
      webResource: {
        text: 'Supreme Final Boss Developer (101101)',
        url: 'https://staging.toptal.net/platform/staff/jobs/101101',
        __typename: 'Link'
      }
    }
  }
})

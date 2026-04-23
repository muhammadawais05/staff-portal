import {
  EngagementCommitmentEnum,
  OperationCallableTypes,
  JobStatus,
  CommitmentAvailability,
  JobWorkType,
  JobHoursOverlap
} from '@staff-portal/graphql/staff'

import { JobDetailsInformationFragment } from './get-job-details-information.staff.gql.types'

export const createJobInformationsMock = (
  job?: Partial<JobDetailsInformationFragment>
) => {
  return {
    viewer: {
      permits: {
        canViewOpportunities: true
      }
    },
    node: {
      id: job?.id || 'VjEtSm9iLTI2MTA0Ng',
      workingTimeFrom: '12:00:00',
      workingTimeTo: '24:00:00',
      workType: JobWorkType.REMOTE,
      hasPreferredHours: false,
      salesforceLink: {
        text: 'Some link',
        url: 'https://google.com'
      },
      requiredApplicationPitch: true,
      hoursOverlapEnum: JobHoursOverlap.HOUR_1,
      timeLengthOnsite: 0,
      title: 'Chief Web Developer (261046)',
      jobType: 'developer',
      isSpecializable: true,
      highPriority: false,
      talentCount: 1,
      specialization: job?.specialization || {
        id: 'VjEtU3BlY2lhbGl6YXRpb24tMQ',
        title: 'Core',
        __typename: 'Specialization'
      },
      client: job?.client || {
        id: 'VjEtQ2xpZW50LTUxNDk3NA',
        businessType: 'Enterprise business',
        webResource: {
          text: 'Kirlin, Kemmer and Turcotte',
          url: 'https://staging.toptal.net/platform/staff/companies/2445793',
          __typename: 'Link'
        },
        fullTimeDiscount: '0',
        partTimeDiscount: '0',
        __typename: 'Client'
      },
      timeZonePreference: {
        name: '(UTC-05:00) America - Chicago',
        value: 'America/Chicago',
        __typename: 'TimeZone'
      },
      startDate: '2021-09-10',
      skillLongShot: true,
      languages: {
        nodes: [{ id: '1', name: 'English' }]
      },
      countryRequirements: {
        nodes: [{ code: 'US', id: '1', name: 'United States' }]
      },
      expectedWeeklyHours: 40,
      maxHourlyRate: 100,
      toptalProjects: false,
      opportunity: {
        id: 'OPPORTUNITY-ID-1',
        name: 'Opportunity',
        age: 6,
        webResource: {
          text: 'Opportunity',
          url: 'https://staff.portal.stuff',
          __typename: 'Link'
        }
      },
      commitment: 'Commitment',
      currentEngagement: {
        id: 'current-engagement-id',
        commitment: EngagementCommitmentEnum.PART_TIME,
        currentCommitment: {
          availability: CommitmentAvailability.part_time
        }
      },
      hiddenForTalents: false,
      originalJob: {
        id: 'ORIGINAL-JOB-ID-1',
        webResource: {
          text: 'original job',
          url: 'https://staff.portal.stuff',
          __typename: 'Link'
        }
      },
      commitmentMinimumHours: 30,
      nicheLongShot: true,
      location: {
        cityName: 'Seattle',
        country: { code: 'US', id: '1', name: 'United States' }
      },
      estimatedLength: 'LENGTH_2_4_WEEKS',
      estimatedEndDate: '2021-10-14',
      positionQuestions: {
        __typename: 'JobPositionQuestionConnection',
        nodes: []
      },
      industries: {
        nodes: []
      },
      skillSets: {
        nodes: [],
        totalCount: 0
      },
      presalesEngagement: true,
      presalesEngagementComment: 'Some comment',
      operations: {
        updateJobEstimatedEndDate: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        updateJobMatcherQuestions: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        setJobPriority: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        updateJobTalentCount: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        updateJobPresalesEngagement: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        updateJobPendingTalentReason: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        updateJobEstimatedWeeklyRevenueTalent: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      estimatedWeeklyRevenueTalent: '50',
      status: JobStatus.ACTIVE,
      ...(job?.description && { description: job?.description }),
      categories: { nodes: [{ id: '1', name: 'category' }] },
      __typename: 'Job'
    } as JobDetailsInformationFragment
  }
}

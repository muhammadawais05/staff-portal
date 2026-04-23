import {
  CommitmentAvailability,
  CumulativeJobStatus,
  EngagementCommitmentEnum,
  JobHoursOverlap,
  JobProbabilityToConvertScoreCategory,
  OperationCallableTypes,
  SkillRating,
  JobStatus
} from '@staff-portal/graphql/staff'

import { JobListItemFragment } from './job-list-item-fragment.staff.gql.types'

export const createJobListItemFragment = (
  job: Partial<JobListItemFragment> = {}
): JobListItemFragment => ({
  id: 'VjEtSm9iLTI0MjkxMQ',
  client: {
    id: '12234',
    enterprise: true,
    webResource: { url: 'http://', text: 'ACME' }
  },
  jobType: 'developer',
  claimedAt: '2021-05-09T16:51:03-04:00',
  searchCandidatesUrl: null,
  sendCandidateUrl: null,
  title: '',
  rehire: true,
  webResource: {
    text: '',
    url: ''
  },
  skillSets: {
    totalCount: 2,
    nodes: [
      {
        id: 'ruby-skillset-id',
        rating: SkillRating.EXPERT,
        main: true,
        niceToHave: false,
        skill: {
          id: 'skill-1',
          name: 'Ruby'
        }
      },
      {
        id: 'js-skillset-id',
        rating: SkillRating.COMPETENT,
        main: false,
        niceToHave: true,
        skill: {
          id: 'skill-2',
          name: 'Javascript'
        }
      }
    ]
  },
  engagements: {
    nodes: [
      {
        id: 'engagement-id',
        talent: {
          id: 'abcd',
          fullName: 'John Doe',
          webResource: { url: 'http://example.com/talent/abcd' }
        }
      }
    ]
  },
  contacts: { nodes: [] },
  postedAt: '',
  cumulativeStatus: CumulativeJobStatus.CLOSED,
  matcherCallScheduled: true,
  hasPreferredHours: true,
  timeZonePreference: {
    name: '(UTC+01:00) Europe - London',
    value: 'Europe - London'
  },
  talentCount: 1,
  preferHoursOverlapping: true,
  hoursOverlapEnum: JobHoursOverlap.HOUR_4,
  invoiceNote: null,
  probabilityToConvert: {
    category: JobProbabilityToConvertScoreCategory.HIGH,
    score: '0.404224332443353',
    negativeFeatures: [
      {
        name: 'act_percent',
        position: 2,
        value: '0'
      },
      {
        name: 'commitment',
        position: 3,
        value: 'full_time'
      },
      {
        name: 'estimated_length',
        position: 4,
        value: '3-6 months'
      },
      {
        name: 'prev_active_jobs',
        position: 6,
        value: '0'
      }
    ],
    positiveFeatures: [
      {
        name: 'operating_system',
        position: 1,
        value: 'Missing'
      },
      {
        name: 'skills_count',
        position: 5,
        value: '1'
      },
      {
        name: 'browser',
        position: 7,
        value: 'Missing'
      }
    ]
  },
  estimatedValue: '12234.00',
  estimatedRevenue: '3456.00',
  operations: {
    approveJob: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    editJobInvoiceNote: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  industries: {
    nodes: [
      {
        id: 'gderssawww',
        name: 'Retail'
      }
    ]
  },
  isSpecializable: true,
  specialization: {
    id: '1sdfwerew342',
    title: 'Core'
  },
  commitment: 'full_time',
  currentEngagement: {
    id: '123',
    commitment: EngagementCommitmentEnum.HOURLY,
    currentCommitment: {
      availability: CommitmentAvailability.hourly
    }
  },
  hiredCount: 3,
  status: JobStatus.ACTIVE,
  automatedAvailabilityRequests: false,
  searchAllowed: true,
  ...job
})

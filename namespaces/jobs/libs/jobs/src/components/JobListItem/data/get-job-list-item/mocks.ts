import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export const createGetJobListItemMock = (id: string) => ({
  id,
  title: 'Senior Marketing Developer (292746)',
  jobType: 'developer',
  workType: 'REMOTE',
  postedAt: '2022-05-07T01:40:27+03:00',
  claimedAt: '2022-05-07T01:46:37+03:00',
  invoiceNote: null,
  commitment: 'full_time',
  talentCount: 1,
  cumulativeStatus: 'PENDING_ENGINEER',
  sendCandidateUrl:
    'https://staging.toptal.net/platform/staff/engagements/new?engagement%5Bjob_id%5D=292746',
  searchCandidatesUrl:
    'https://staging.toptal.net/platform/staff/jobs/292746/search_for_talents',
  searchApplicantsUrl:
    'https://staging.toptal.net/platform/staff/jobs/292746/search_for_applicants',
  searchRejectedTalentsUrl:
    'https://staging.toptal.net/platform/staff/jobs/292746/search_for_rejected_talents',
  matcherCallScheduled: false,
  hoursOverlapEnum: null,
  hasPreferredHours: false,
  preferHoursOverlapping: false,
  rehire: false,
  automatedAvailabilityRequests: false,
  hiredCount: 0,
  status: 'PENDING_ENGINEER',
  searchAllowed: true,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  engagements: {
    nodes: [],
    __typename: 'JobEngagementConnection'
  },
  timeZonePreference: {
    name: '(UTC+03:00) Asia - Jerusalem',
    value: 'Asia/Jerusalem',
    __typename: 'TimeZone'
  },
  client: {
    id: 'VjEtQ2xpZW50LTQ5Mjc5NQ',
    enterprise: true,
    webResource: {
      url: 'https://staff-portal.toptal.net/clients/492795',
      text: 'Konopelski, Gusikowski and Hoppe',
      __typename: 'Link'
    },
    __typename: 'Client'
  },
  contacts: {
    nodes: [
      {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTMzMDgxNzk',
        fullName: 'Natashia Treutel',
        __typename: 'CompanyRepresentative'
      }
    ],
    __typename: 'CompanyRepresentativeConnection'
  },
  skillSets: {
    totalCount: 2,
    nodes: [
      {
        id: 'VjEtU2tpbGxTZXQtMzc0MTMxMA',
        rating: 'EXPERT',
        main: false,
        niceToHave: false,
        skill: {
          id: 'VjEtU2tpbGwtMzcwMTY',
          name: 'DevOps',
          __typename: 'Skill'
        },
        __typename: 'SkillSet'
      },
      {
        id: 'VjEtU2tpbGxTZXQtMzc0MTMxMQ',
        rating: 'STRONG',
        main: true,
        niceToHave: false,
        skill: {
          id: 'VjEtU2tpbGwtMzY5NDA',
          name: 'Amazon Web Services (AWS)',
          __typename: 'Skill'
        },
        __typename: 'SkillSet'
      }
    ],
    __typename: 'SkillSetConnection'
  },
  webResource: {
    url: 'https://staging.toptal.net/platform/staff/jobs/292746',
    text: 'Senior Marketing Developer (292746)',
    __typename: 'Link'
  },
  probabilityToConvert: {
    category: 'LOW',
    score: '0.263376940375436',
    negativeFeatures: [
      {
        name: 'commitment',
        position: 2,
        value: 'full_time',
        __typename: 'ProbabilityToConvertFeature'
      },
      {
        name: 'estimated_length',
        position: 3,
        value: '6-12 months',
        __typename: 'ProbabilityToConvertFeature'
      },
      {
        name: 'prev_posted_jobs',
        position: 4,
        value: '1',
        __typename: 'ProbabilityToConvertFeature'
      },
      {
        name: 'claimed_hour',
        position: 5,
        value: '22',
        __typename: 'ProbabilityToConvertFeature'
      },
      {
        name: 'max_hourly_rate',
        position: 6,
        value: '0',
        __typename: 'ProbabilityToConvertFeature'
      },
      {
        name: 'time_zone_name',
        position: 7,
        value: 'Asia/Jerusalem',
        __typename: 'ProbabilityToConvertFeature'
      }
    ],
    positiveFeatures: [
      {
        name: 'act_percent',
        position: 1,
        value: '100',
        __typename: 'ProbabilityToConvertFeature'
      }
    ],
    __typename: 'JobProbabilityToConvertScore'
  },
  operations: {
    editJobInvoiceNote: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    approveJob: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['You can only approve jobs which are pending claiming'],
      __typename: 'Operation'
    },
    __typename: 'JobOperations'
  },
  estimatedValue: '41339.64',
  estimatedRevenue: '156960.0',
  industries: {
    nodes: [],
    __typename: 'IndustryConnection'
  },
  isSpecializable: true,
  specialization: {
    id: 'VjEtU3BlY2lhbGl6YXRpb24tMzAwMDM',
    title: 'DevOps',
    __typename: 'Specialization'
  },
  currentEngagement: null,
  __typename: 'Job'
})

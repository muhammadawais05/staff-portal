import { encodeEntityId } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export const getJobListItemResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      title: 'Lead Decentralized Information Asset Program Designer (237405)',
      jobType: 'designer',
      workType: 'REMOTE',
      postedAt: '2021-02-26T17:28:06+03:00',
      claimedAt: '2021-02-26T17:31:11+03:00',
      invoiceNote: null,
      commitment: 'hourly',
      talentCount: 1,
      cumulativeStatus: 'CLOSED',
      sendCandidateUrl: null,
      searchCandidatesUrl: null,
      searchApplicantsUrl: null,
      searchRejectedTalentsUrl: null,
      matcherCallScheduled: false,
      hoursOverlapEnum: null,
      hasPreferredHours: false,
      preferHoursOverlapping: false,
      rehire: false,
      automatedAvailabilityRequests: false,
      hiredCount: 1,
      status: 'CLOSED',
      searchAllowed: true,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla\nsodales est.',
      engagements: {
        nodes: [
          {
            id: encodeEntityId('123', 'Engagement'),
            talent: {
              id: encodeEntityId('123', 'Talent'),
              fullName: 'Arica Legros',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/talents/1795003',
                __typename: 'Link'
              },
              __typename: 'Talent'
            },
            __typename: 'Engagement'
          }
        ],
        __typename: 'JobEngagementConnection'
      },
      timeZonePreference: {
        name: '(UTC+00:00) Europe - London',
        value: 'Europe/London',
        __typename: 'TimeZone'
      },
      client: {
        id: encodeEntityId('123', 'Client'),
        enterprise: false,
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/companies/2280392',
          text: 'Upton, Johnson and Ledner',
          __typename: 'Link'
        },
        __typename: 'Client'
      },
      contacts: {
        nodes: [],
        __typename: 'CompanyRepresentativeConnection'
      },
      skillSets: {
        totalCount: 1,
        nodes: [
          {
            id: encodeEntityId('123', 'SkillSet'),
            rating: 'COMPETENT',
            main: false,
            niceToHave: false,
            skill: {
              id: encodeEntityId('123', 'Skill'),
              name: 'Responsive Web Design (RWD)',
              __typename: 'Skill'
            },
            __typename: 'SkillSet'
          }
        ],
        __typename: 'SkillSetConnection'
      },
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/jobs/237405',
        text: 'Lead Decentralized Information Asset Program Designer (237405)',
        __typename: 'Link'
      },
      probabilityToConvert: {
        category: 'VERY_HIGH',
        score: '0.621766454769317',
        negativeFeatures: [
          {
            name: 'commitment',
            position: 2,
            value: 'full_time',
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
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'JobOperations'
      },
      estimatedValue: null,
      estimatedRevenue: null,
      industries: {
        nodes: [],
        __typename: 'IndustryConnection'
      },
      isSpecializable: false,
      specialization: {
        id: encodeEntityId('123', 'Specialization'),
        title: 'Digital Design',
        __typename: 'Specialization'
      },
      currentEngagement: {
        id: encodeEntityId('123', 'Engagement'),
        commitment: 'HOURLY',
        currentCommitment: {
          availability: 'hourly',
          __typename: 'AdjustedCommitment'
        },
        __typename: 'Engagement'
      },
      __typename: 'Job'
    }
  }
})

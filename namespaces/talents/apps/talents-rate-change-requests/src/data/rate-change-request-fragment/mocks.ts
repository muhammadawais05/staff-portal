import {
  TalentCumulativeStatus,
  TalentSupplyHealthPriority,
  TalentSpecializationApplicationStatus,
  SkillRating,
  TalentAllocatedHoursAvailability,
  OperationCallableTypes,
  RateChangeRequestStatus,
  RateChangeRequestTypeEnum,
  EngagementCommitmentEnum
} from '@staff-portal/graphql/staff'

import {
  RateChangeRequestEngagementFragment,
  RateChangeRequestFragment,
  RateChangeRequestTalentFragment
} from './rate-change-request-fragment.staff.gql.types'

export const createRateChangeRequestMock = (
  fields?: Partial<RateChangeRequestFragment>
) => ({
  id: 'VjEtUmF0ZUNoYW5nZVJlcXVlc3QtMQ',
  createdAt: '2021-11-30T12:46:13+03:00' as const,
  claimedAt: '2021-11-30T12:46:13+03:00' as const,
  claimerComment: 'Test claimer comment',
  currentRate: '50.0',
  desiredRate: '100.0',
  outcomeRate: '90.0',
  requestTypeEnumValue: RateChangeRequestTypeEnum.CONSULTATION,
  status: RateChangeRequestStatus.COMPLETED,
  talentComment: 'Test talent comment',
  operations: {
    completeRateChangeRequest: {
      callable: OperationCallableTypes.ENABLED,
      messages: ['Rate change request is already processed.'],
      __typename: 'Operation'
    },
    __typename: 'RateChangeRequestOperations'
  },
  claimer: {
    id: 'VjEtU3RhZmYtMTM5MTMxNQ',
    webResource: {
      text: 'Andrea Matus',
      url: 'https://staging.toptal.net/platform/staff/staff/1391315',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  talent: createTalentForRateChangeRequestMock(),
  engagement: null,
  ...fields,
  __typename: 'RateChangeRequest'
})

export const createTalentForRateChangeRequestMock = (
  fields?: Partial<RateChangeRequestTalentFragment>
) => ({
  id: 'VjEtVGFsZW50LTI3NjMzMzI',
  type: 'Developer',
  roleTitle: 'Developer',
  fullName: 'Domenic Koss',
  email: 'domenic.koss@toptal.net',
  cumulativeStatus: TalentCumulativeStatus.ACTIVE,
  newcomer: true,
  topShield: false,
  allocatedHoursAvailability: TalentAllocatedHoursAvailability.FULL_TIME,
  allocatedHoursAvailabilityIncludingEndingEngagements:
    TalentAllocatedHoursAvailability.FULL_TIME,
  availableHours: 40,
  availableHoursIncludingEndingEngagements: 40,
  allocatedHours: 40,
  timeZone: {
    __typename: 'TimeZone',
    name: '(UTC+03:00) Europe/Moscow',
    value: 'Europe/Moscow'
  },
  supplyHealthModelData: {
    priority: TalentSupplyHealthPriority.MEDIUM,
    snapshotAt: '2021-06-07T14:00:04+03:00' as const,
    __typename: 'TalentSupplyHealthModelData'
  },
  locationV2: {
    countryName: 'Colombia',
    cityName: 'Bogotá',
    __typename: 'Location'
  },
  investigations: {
    nodes: [],
    __typename: 'InvestigationConnection'
  },
  specializationApplications: {
    nodes: [
      {
        id: 'test-id',
        status: TalentSpecializationApplicationStatus.APPROVED,
        specialization: {
          id: 'test-id',
          title: 'Core'
        }
      }
    ],
    __typename: 'SpecializationApplicationConnection'
  },
  rateRecommendation: {
    meanHour: '1',
    meanWeek: '5',
    quantity: 4,
    __typename: 'TalentRateRecommendation'
  },
  skillSets: {
    nodes: [
      {
        id: '1',
        rating: SkillRating.EXPERT,
        connections: {
          totalCount: 1,
          __typename: 'SkillConnectionSkillableConnection'
        },
        skill: {
          id: 'VjEtU2tpbGwtMzY5NDg',
          name: 'GitHub',
          __typename: 'Skill'
        },
        __typename: 'SkillSet'
      }
    ],
    __typename: 'TalentSkillSets'
  },
  slackContacts: {
    nodes: [
      {
        id: 'slack-contact-id',
        webResource: {
          url: 'some-slack-url'
        }
      }
    ]
  },
  webResource: {
    text: 'Domenic Koss',
    url: 'https://staging.toptal.net/platform/staff/talents/1830142',
    __typename: 'Link'
  },
  __typename: 'Talent',
  ...fields
})

export const createActiveEngagementMock = (
  fields?: Partial<RateChangeRequestEngagementFragment>
): RateChangeRequestEngagementFragment => ({
  id: '123',
  commitment: EngagementCommitmentEnum.FULL_TIME,
  webResource: {
    text: 'Engagement 1',
    url: 'https://staging.toptal.net/platform/staff/engagements/1'
  },
  startDate: '2020-01-01',
  currentCommitment: {
    adjustedCompanyRate: {
      hourlyHint: {
        value: '299.0'
      }
    }
  },
  job: {
    skillSets: {
      nodes: [
        {
          skill: {
            name: 'React'
          },
          main: true
        }
      ]
    },
    client: {
      fullName: 'Task Force 141',
      accountManager: {
        fullName: 'Alex Mason'
      },
      relationshipManager: {
        fullName: 'David Mason'
      },
      webResource: {
        text: 'My client',
        url: 'https://staging.toptal.net/platform/staff/companies/1'
      }
    }
  },
  ...fields
})

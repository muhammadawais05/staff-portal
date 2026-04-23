import {
  TalentCumulativeStatus,
  TalentSpecializationApplicationStatus,
  OperationCallableTypes,
  TalentAllocatedHoursAvailability
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createClientWillHireAgainFragmentMock } from '@staff-portal/talents/src/mocks'

import { TalentsListItemFragment } from './talents-list-item-fragment.staff.gql.types'

export const createTalentsListItemFragmentMock = (
  talent: Partial<TalentsListItemFragment> = {}
): TalentsListItemFragment => ({
  id: encodeEntityId('1000', 'Test'),
  type: 'Developer',
  roleTitle: 'Developer',
  fullName: 'Virginie Mraz',
  photo: null,
  webResource: {
    url: 'https://test.url/talents/123'
  },
  resumeUrl: 'https://test.url/resume',
  suspended: false,
  sendToJobUrl: 'https://test.url/job',
  cumulativeStatus: TalentCumulativeStatus.ACTIVE,
  newcomer: true,
  topShield: false,
  associatedRoles: {
    nodes: []
  },
  talentPartner: null,
  cityDescription: 'Moscow',
  locationV2: {
    countryName: 'Russia'
  },
  timeZone: {
    name: '(UTC+03:00) Europe - Moscow'
  },
  currentSignInAt: '2021-03-01T13:16:49+03:00',
  currentSignInIp: '95.165.169.183',
  ipLocation: {
    cityName: 'Moscow',
    countryName: 'Russia'
  },
  lastVisitedDate: '2021-03-24',
  activatedAt: '2021-03-23T20:43:27+03:00',
  updatedAt: '2021-03-24T09:00:32+03:00',
  joinedAt: '2021-02-10T16:23:27+03:00',
  deltaWaitingDays: 3,
  lastClosedEngagementEndDate: null,
  lastAvailabilityIncreaseDate: '2021-03-23',
  hourlyRate: '30.0',
  defaultClientRates: {
    hourlyRate: '71',
    weeklyRateFullTime: '2272.0',
    weeklyRatePartTime: '1136.0'
  },
  currentInterviews: {
    totalCount: 0,
    inLast2DaysCounts: [],
    inLast2To7DaysCounts: []
  },
  vertical: {
    id: 'f07911f8190a',
    specializations: {
      totalCount: 1
    }
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
    ]
  },
  investigations: {
    nodes: []
  },
  operations: {
    createTalentAvailabilityRequest: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  allocatedHoursAvailability: TalentAllocatedHoursAvailability.UNAVAILABLE,
  allocatedHoursAvailabilityIncludingEndingEngagements:
    TalentAllocatedHoursAvailability.UNAVAILABLE,
  availableHours: 0,
  availableHoursIncludingEndingEngagements: 0,
  allocatedHours: 0,
  allocatedHoursConfirmedAt: null,
  unavailableAllocatedHoursChangeRequest: null,
  availabilityRequestMetadata: {
    lowActivity: false,
    pending: 0,
    prediction: 0.1570123288908929,
    recentConfirmed: 0,
    recentRejected: 0
  },
  endingEngagements: {
    nodes: []
  },
  profile: {
    id: '9340f4cb-cffd',
    yearsOfManagementExperience: 9,
    yearsOfEnterpriseExperience: '3',
    employments: {
      cumulativeReportRange: {
        from: 1,
        to: 20
      }
    },
    customRequirements: {
      backgroundCheck: true,
      drugTest: true,
      timeTrackingTools: false
    },
    travelVisas: {
      nodes: [
        {
          id: 'c80810f341fe',
          expiryDate: '2023-08-31',
          visaType: 'Work Visa',
          country: {
            id: '2df3b5d5d26b',
            name: 'Portugal'
          }
        }
      ],
      totalCount: 1
    },
    industrySets: {
      nodes: []
    }
  },
  feedbackStatistics: {
    nodes: []
  },
  engagements: {
    counters: {
      workingNumber: 0,
      clientsNumber: 0,
      repeatedClientsNumber: 0,
      acceptedInterviewsNumber: 0,
      approvedTrialsNumber: 0,
      interviewsNumber: 0,
      successRate: 0,
      trialsNumber: 0
    }
  },
  ...createClientWillHireAgainFragmentMock(),
  ...talent
})
